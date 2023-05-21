import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import {
  CreateTicketCommandHandler,
  RedeemTicketCommandHandler,
  SaveRedeemAttemptCommandHandler,
} from './commands/handlers';
import { UsersModule } from 'src/users/users.module';
import { GetTicketQueryHandler } from './queries/handlers';
import { GetRedemptionsQueryHandler } from './queries/handlers/getRedemptions.handler';
import { RedemptionAttempt } from './entities/redemptions.entity';
import { TicketsSaga } from './sagas/tickets.sagas';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, RedemptionAttempt]),
    CqrsModule,
    JwtModule,
    UsersModule,
  ],
  controllers: [TicketsController],
  providers: [
    TicketsService,
    CreateTicketCommandHandler,
    RedeemTicketCommandHandler,
    SaveRedeemAttemptCommandHandler,
    GetTicketQueryHandler,
    GetRedemptionsQueryHandler,
    TicketsSaga,
  ],
})
export class TicketsModule {}
