import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

describe('TicketsController', () => {
  let app: INestApplication;
  let ticketsService: TicketsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [TicketsService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    ticketsService = moduleFixture.get<TicketsService>(TicketsService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /tickets', () => {
    it('should create a new ticket', async () => {
      const createTicketDto: CreateTicketDto = {
        code: 'ABC123',
      };

      const response = await request(app.getHttpServer())
        .post('/tickets')
        .send(createTicketDto)
        .expect(201);

      expect(response.body.message).toBe('OK_SUCCESSFUL_OPERATION');
      expect(ticketsService.create).toHaveBeenCalledWith(createTicketDto);
    });
  });

  describe('PATCH /tickets/redeem/:ticketCode', () => {
    it('should redeem a ticket', async () => {
      const ticketCode = 'ABC123';
      const userId = '12345';

      const response = await request(app.getHttpServer())
        .patch(`/tickets/redeem/${ticketCode}`)
        .send({ userId })
        .expect(200);

      expect(response.body.message).toBe('OK_SUCCESSFUL_OPERATION');
      expect(ticketsService.redeem).toHaveBeenCalledWith({
        code: ticketCode,
        userId,
      });
    });

    // Add more test cases as needed
  });

  describe('GET /tickets/redemptions/user/:userId', () => {
    it('should get the redemptions history for a user', async () => {
      const userId = '12345';

      const response = await request(app.getHttpServer())
        .get(`/tickets/redemptions/user/${userId}`)
        .expect(200);

      expect(response.body.message).toBe('OK_SUCCESSFUL_OPERATION');
      expect(ticketsService.getRedemptionsHistory).toHaveBeenCalledWith(userId);
    });
  });
});
