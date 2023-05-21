import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { GetTicketQuery } from '../implementations';

@QueryHandler(GetTicketQuery)
export class GetTicketQueryHandler implements IQueryHandler<GetTicketQuery> {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) {}

  async execute(query: GetTicketQuery): Promise<Ticket> {
    const { code } = query;
    const ticketFound = await this.ticketsRepository.find({
      where: { code },
    });

    if (!ticketFound) {
      throw new Error('ticket not found');
    }

    return ticketFound[0];
  }
}
