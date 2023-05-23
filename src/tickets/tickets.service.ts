import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PostResponse } from './classes/user-responses.class';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { OK_SUCCESSFUL_OPERATION } from 'src/common/utils/constants/contants';
import {
  CreateTicketCommand,
  RedeemTicketCommand,
} from './commands/implementations';
import { GetRedemptionsQuery, GetTicketQuery } from './queries/implementations';
import { RedeemTicketDto } from './dto/redeem-ticket.dto';
import * as moment from 'moment';
import { RedeemAttemptEvent } from './events/redeem-attempt.event';
import { RedemptionStatus } from './entities/redemptions.entity';

@Injectable()
export class TicketsService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private eventBus: EventBus,
  ) {}
  async create(createTicketDto: CreateTicketDto): Promise<PostResponse> {
    const response = await this.commandBus.execute(
      new CreateTicketCommand(createTicketDto),
    );

    return {
      message: OK_SUCCESSFUL_OPERATION,
      data: response,
    };
  }

  async redeem(redeemTicketDto: RedeemTicketDto) {
    const redemptionHistory = await this.queryBus.execute(
      new GetRedemptionsQuery(redeemTicketDto.userId),
    );
    const ticketFound = await this.queryBus.execute(
      new GetTicketQuery(redeemTicketDto.code),
    );
    const oneHourAgo = moment().subtract(1, 'hour');
    const redemptionAttemptsWithinOneHour = redemptionHistory.filter(
      (redemption) => moment(redemption.date).isAfter(oneHourAgo),
    );
    if (redemptionAttemptsWithinOneHour.length > 0) {
      this.eventBus.publish(
        new RedeemAttemptEvent({
          userId: redeemTicketDto.userId,
          ticketId: ticketFound.id,
          status: RedemptionStatus.failed,
        }),
      );
      throw new NotAcceptableException('Redeem attempts exceeded');
    }

    const response = await this.commandBus.execute(
      new RedeemTicketCommand(redeemTicketDto),
    );

    return {
      message: OK_SUCCESSFUL_OPERATION,
      data: response,
    };
  }

  async getRedemptionsHistory(userId: string) {
    const redemptions = await this.queryBus.execute(
      new GetRedemptionsQuery(userId),
    );

    return {
      message: OK_SUCCESSFUL_OPERATION,
      data: redemptions,
    };
  }
}
