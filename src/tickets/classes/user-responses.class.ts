import { ApiProperty } from '@nestjs/swagger';

class Data {
  @ApiProperty()
  token: string;
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
