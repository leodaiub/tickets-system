import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Ticket } from '../entities/ticket.entity';
import { IsAlphanumeric } from 'class-validator';
export class CreateTicketDto extends PickType(Ticket, ['code']) {
  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  code: string;
}
