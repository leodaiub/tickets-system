import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignInUserDto extends PickType(User, ['email', 'password']) {
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
