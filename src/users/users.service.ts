import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PostResponse } from './classes/user-responses.class';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { comparePassword } from 'src/users/functions';
import { OK_SUCCESSFUL_OPERATION } from 'src/common/utils/constants/contants';
import { SignInUserQuery } from './queries/implementations';
import { CreateUserCommand } from './commands/implementations';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<PostResponse> {
    const response = await this.commandBus.execute(
      new CreateUserCommand(createUserDto),
    );

    return {
      message: OK_SUCCESSFUL_OPERATION,
      data: response,
    };
  }

  async signIn(credentials: SignInUserDto): Promise<PostResponse> {
    const { password, id, ...user } = await this.queryBus.execute(
      new SignInUserQuery(credentials),
    );
    await comparePassword(credentials.password, password);

    return {
      message: OK_SUCCESSFUL_OPERATION,
      data: { token: await this.jwtService.signAsync(id), user },
    };
  }
}
