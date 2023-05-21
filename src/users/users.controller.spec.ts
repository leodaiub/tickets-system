import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';

describe('UsersController', () => {
  let app: INestApplication;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userService = moduleFixture.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /users/signup', () => {
    const createUserDto: CreateUserDto = {
      name: 'usertest',
      password: 'testpassword',
      email: 'test@email.com',
    };

    it('should create a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send(createUserDto)
        .expect(201);

      expect(response.body.message).toBe('OK_SUCCESSFUL_OPERATION');
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should return an error for invalid user data', async () => {
      const createUserDto: CreateUserDto = {
        name: 'usertest',
        password: 'testpassword',
        email: 'test@email.com',
      };

      const response = await request(app.getHttpServer())
        .post('/users/signup')
        .send(createUserDto)
        .expect(400);

      expect(response.body.message).toBe('Bad Request');
      expect(response.body.error).toContain('username should not be empty');
      expect(userService.create).not.toHaveBeenCalled();
    });
  });

  describe('POST /users/signin', () => {
    const signInUserDto: SignInUserDto = {
      email: 'test@email.com',
      password: 'testpassword',
    };

    it('should sign in a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signin')
        .send(signInUserDto)
        .expect(200);

      expect(response.body.message).toBe('OK_SUCCESSFUL_OPERATION');
      expect(userService.signIn).toHaveBeenCalledWith(signInUserDto);
    });

    it('should return an error for invalid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/signin')
        .send(signInUserDto)
        .expect(401);

      expect(response.body.message).toBe('Unauthorized');
      expect(userService.signIn).toHaveBeenCalledWith(signInUserDto);
    });
  });
});
