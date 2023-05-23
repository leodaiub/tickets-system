import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedeemTicketCommand } from '../implementations';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { RedeemAttemptEvent } from 'src/tickets/events/redeem-attempt.event';
import { RedemptionStatus } from 'src/tickets/entities/redemptions.entity';
import { ConflictException } from '@nestjs/common';

@CommandHandler(RedeemTicketCommand)
export class RedeemTicketCommandHandler
  implements ICommandHandler<RedeemTicketCommand>
{
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    private eventBus: EventBus,
  ) {}

  async execute(command: RedeemTicketCommand): Promise<Ticket> {
    const {
      redeemTicketDto: { code, userId },
    } = command;
    const ticketFound = await this.ticketsRepository.findOneOrFail({
      where: { code },
    });

    if (ticketFound?.userId) {
      this.eventBus.publish(
        new RedeemAttemptEvent({
          userId,
          ticketId: ticketFound.id,
          status: RedemptionStatus.failed,
        }),
      );
      throw new ConflictException('Ticket already redeemed');
    }

    const savedTicket = await this.ticketsRepository.save({
      id: ticketFound.id,
      userId,
    });

    this.eventBus.publish(
      new RedeemAttemptEvent({
        userId,
        ticketId: ticketFound.id,
        status: RedemptionStatus.succesful,
      }),
    );

    return savedTicket;
  }
}
