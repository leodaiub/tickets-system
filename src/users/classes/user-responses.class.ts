import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

class Data {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: User;
}

export class PostResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: Data;
}

export class ErrorResponse {
  @ApiProperty()
  statusCode: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
