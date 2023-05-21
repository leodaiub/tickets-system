import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateUserCommand {
  constructor(public user: CreateUserDto) {}
}
