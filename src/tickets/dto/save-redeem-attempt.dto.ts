import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { IsAlphanumeric } from 'class-validator';
import { RedemptionStatus } from '../entities/redemptions.entity';

export class SaveRedeemAttemptDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  ticketId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(RedemptionStatus)
  @IsNotEmpty()
  status: RedemptionStatus;
}
