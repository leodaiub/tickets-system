import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  CreateUserDecorators,
  SignInUserDecorator,
} from './decorators/user.decorators';
import { PostResponse } from './classes/user-responses.class';
import { SignInUserDto } from './dto/sign-in-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @CreateUserDecorators()
  async create(@Body() createUserDto: CreateUserDto): Promise<PostResponse> {
    return await this.usersService.create(createUserDto);
  }

  @Post('/signin')
  @SignInUserDecorator()
  async signin(@Body() credentials: SignInUserDto): Promise<PostResponse> {
    return await this.usersService.signIn(credentials);
  }
}
