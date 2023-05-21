import { SaveRedeemAttemptDto } from '../dto/save-redeem-attempt.dto';

export class RedeemAttemptEvent {
  constructor(public readonly redeemAttemptDto: SaveRedeemAttemptDto) {}
}
