import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignInUserDto extends PickType(User, ['email', 'password']) {
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
}
