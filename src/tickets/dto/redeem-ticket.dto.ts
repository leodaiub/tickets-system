import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { IsAlphanumeric } from 'class-validator';

export class RedeemTicketDto {
  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  code: string;

  @IsUUID()
  userId: string;
}
