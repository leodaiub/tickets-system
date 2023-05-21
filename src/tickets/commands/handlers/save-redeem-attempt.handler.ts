import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveRedeemAttemptCommand } from '../implementations';
import { RedemptionAttempt } from 'src/tickets/entities/redemptions.entity';

@CommandHandler(SaveRedeemAttemptCommand)
export class SaveRedeemAttemptCommandHandler
  implements ICommandHandler<SaveRedeemAttemptCommand>
{
  constructor(
    @InjectRepository(RedemptionAttempt)
    private redemptionAttemptsRepository: Repository<RedemptionAttempt>,
  ) {}

  async execute(command: SaveRedeemAttemptCommand): Promise<RedemptionAttempt> {
    const { data } = command;
    const savedTicket = await this.redemptionAttemptsRepository.save(data);
    return savedTicket;
  }
}
