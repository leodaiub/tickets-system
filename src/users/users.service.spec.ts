import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { comparePassword } from './functions';

describe('UsersService', () => {
  let service: UsersService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: CommandBus, useValue: {} },
        { provide: QueryBus, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('create', () => {
    test('should create a user and return a response', async () => {
      const createUserDto: CreateUserDto = {
        name: 'usertest',
        password: 'testpassword',
        email: 'test@email.com',
      };
      // Provide your own test data
      const commandResponse = {}; // Provide the expected response from the commandBus

      jest.spyOn(commandBus, 'execute').mockResolvedValue(commandResponse);

      const result = await service.create(createUserDto);

      expect(commandBus.execute).toHaveBeenCalledWith(
        expect.objectContaining({ constructor: expect.any(Function) }),
      );
      expect(result).toEqual({
        message: 'OK_SUCCESSFUL_OPERATION',
        data: commandResponse,
      });
    });

    test('should throw DatabaseError if an error occurs', async () => {
      const createUserDto: CreateUserDto = {
        name: 'usertest',
        password: 'testpassword',
        email: 'test@email.com',
      };
      // Provide your own test data
      const errorMessage = 'Database error';

      jest
        .spyOn(commandBus, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.create(createUserDto)).rejects.toThrowError(
        'DatabaseError: ' + errorMessage,
      );
    });
  });

  describe('signIn', () => {
    test('should sign in a user and return a response', async () => {
      const signInUserDto: SignInUserDto = {
        email: 'test@email.com',
        password: 'testpassword',
      }; // Provide your own test data
      const queryResponse = {}; // Provide the expected response from the queryBus
      const password = 'password'; // Provide the password for comparison

      jest.spyOn(queryBus, 'execute').mockResolvedValue(queryResponse);
      jest.fn(comparePassword).mockImplementation();

      const result = await service.signIn(signInUserDto);

      expect(queryBus.execute).toHaveBeenCalledWith(
        expect.objectContaining({ constructor: expect.any(Function) }),
      );
      expect(comparePassword).toHaveBeenCalledWith(
        signInUserDto.password,
        password,
      );
      expect(result).toEqual({
        message: 'OK_SUCCESSFUL_OPERATION',
        data: {
          token: expect.any(String),
          user: queryResponse,
        },
      });
    });
  });
});
