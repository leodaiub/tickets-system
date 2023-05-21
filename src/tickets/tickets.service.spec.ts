import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreateTicketDto } from './dto/create-ticket.dto';

describe('TicketsService', () => {
  let service: TicketsService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        { provide: CommandBus, useValue: {} },
        { provide: QueryBus, useValue: {} },
        { provide: EventBus, useValue: {} },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
    eventBus = module.get<EventBus>(EventBus);
  });

  describe('create', () => {
    test('should create a ticket and return a response', async () => {
      const createTicketDto: CreateTicketDto = {
        code: 'ABC123',
      }; // Provide your own test data
      const commandResponse = {}; // Provide the expected response from the commandBus

      jest.spyOn(commandBus, 'execute').mockResolvedValue(commandResponse);

      const result = await service.create(createTicketDto);

      expect(commandBus.execute).toHaveBeenCalledWith(
        expect.objectContaining({ constructor: expect.any(Function) }),
      );
      expect(result).toEqual({
        message: 'OK_SUCCESSFUL_OPERATION',
        data: commandResponse,
      });
    });

    test('should throw DatabaseError if an error occurs', async () => {
      const createTicketDto: CreateTicketDto = {
        code: 'ABC123',
      }; // Provide your own test data
      const errorMessage = 'Database error';

      jest
        .spyOn(commandBus, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.create(createTicketDto)).rejects.toThrowError(
        'DatabaseError: ' + errorMessage,
      );
    });
  });

  describe('redeem', () => {
    test('should redeem a ticket and return a response', async () => {
      const code = 'ABC123';
      const userId = '12345';
      const redemptionHistory = []; // Provide the expected response from the queryBus for GetRedemptionsQuery
      const ticketFound = {}; // Provide the expected response from the queryBus for GetTicketQuery
      // const oneHourAgo = moment().subtract(1, 'hour');

      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(redemptionHistory);
      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(ticketFound);
      // jest.spyOn(moment, 'isAfter').mockReturnValue(true);
      jest.spyOn(eventBus, 'publish').mockImplementation();

      const result = await service.redeem({ code, userId });

      expect(queryBus.execute).toHaveBeenCalledWith(
        expect.objectContaining({ constructor: expect.any(Function) }),
      );
      expect(eventBus.publish).toHaveBeenCalledWith(
        expect.objectContaining({ constructor: expect.any(Function) }),
      );
      expect(result).toEqual({
        message: 'OK_SUCCESSFUL_OPERATION',
        data: expect.anything(),
      });
    });

    test('should throw an error if redemption attempts exceeded', async () => {
      const code = 'ABC123';
      const userId = '12345';
      const redemptionHistory = [{}]; // Provide the expected response from the queryBus for GetRedemptionsQuery
      const ticketFound = { id: '123' }; // Provide the expected response from the queryBus for GetTicketQuery
      // const oneHourAgo = moment().subtract(1, 'hour');

      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(redemptionHistory);
      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(ticketFound);
      // jest.spyOn(moment, 'isAfter').mockReturnValue(false);
      jest.spyOn(eventBus, 'publish').mockImplementation();

      await expect(service.redeem({ code, userId })).rejects.toThrowError(
        'Redeem attempts exceeded',
      );
      expect(eventBus.publish).toHaveBeenCalledWith(
        expect.objectContaining({ constructor: expect.any(Function) }),
      );
    });

    test('should throw DatabaseError if an error occurs', async () => {
      const code = 'ABC123';
      const userId = '12345';
      const errorMessage = 'Database error';

      jest
        .spyOn(queryBus, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.redeem({ code, userId })).rejects.toThrowError(
        'DatabaseError: ' + errorMessage,
      );
    });
  });

  describe('getRedemptionsHistory', () => {
    test('should get redemptions history and return a response', async () => {
      const userId = '123'; // Provide your own test data
      const redemptions = []; // Provide the expected response from the queryBus for GetRedemptionsQuery

      jest.spyOn(queryBus, 'execute').mockResolvedValue(redemptions);

      const result = await service.getRedemptionsHistory(userId);

      expect(queryBus.execute).toHaveBeenCalledWith(
        expect.objectContaining({ constructor: expect.any(Function) }),
      );
      expect(result).toEqual({
        message: 'OK_SUCCESSFUL_OPERATION',
        data: redemptions,
      });
    });

    test('should throw DatabaseError if an error occurs', async () => {
      const userId = '123'; // Provide your own test data
      const errorMessage = 'Database error';

      jest
        .spyOn(queryBus, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.getRedemptionsHistory(userId)).rejects.toThrowError(
        'DatabaseError: ' + errorMessage,
      );
    });
  });
});
