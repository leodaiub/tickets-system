import { SaveRedeemAttemptDto } from 'src/tickets/dto/save-redeem-attempt.dto';

export class SaveRedeemAttemptCommand {
  constructor(public data: SaveRedeemAttemptDto) {}
}
