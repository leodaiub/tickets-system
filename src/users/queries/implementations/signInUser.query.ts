import { SignInUserDto } from 'src/users/dto/sign-in-user.dto';

export class SignInUserQuery {
  constructor(public signInDto: SignInUserDto) {}
}
