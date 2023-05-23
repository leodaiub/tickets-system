import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { RedeemAttemptEvent } from '../events/redeem-attempt.event';
import { SaveRedeemAttemptCommand } from '../commands/implementations';

@Injectable()
export class TicketsSaga {
  @Saga()
  TicketRedeemAttempeted = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RedeemAttemptEvent),
      map((event) => {
        const {
          redeemAttemptDto: { ticketId, userId, status },
        } = event;
        return new SaveRedeemAttemptCommand({ ticketId, userId, status });
      }),
    );
  };
}
