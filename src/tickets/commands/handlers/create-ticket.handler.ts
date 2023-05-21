import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketCommand } from '../implementations';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@CommandHandler(CreateTicketCommand)
export class CreateTicketCommandHandler
  implements ICommandHandler<CreateTicketCommand>
{
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) {}

  async execute(command: CreateTicketCommand): Promise<Ticket> {
    const { ticket } = command;
    const savedTicket = await this.ticketsRepository.save(ticket);
    return savedTicket;
  }
}
