import { CreateTicketDto } from 'src/tickets/dto/create-ticket.dto';

export class CreateTicketCommand {
  constructor(public ticket: CreateTicketDto) {}
}
