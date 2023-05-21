import { RedeemTicketDto } from 'src/tickets/dto/redeem-ticket.dto';

export class RedeemTicketCommand {
  constructor(public redeemTicketDto: RedeemTicketDto) {}
}
