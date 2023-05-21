import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetRedemptionsQuery } from '../implementations';
import { RedemptionAttempt } from 'src/tickets/entities/redemptions.entity';

@QueryHandler(GetRedemptionsQuery)
export class GetRedemptionsQueryHandler
  implements IQueryHandler<GetRedemptionsQuery>
{
  constructor(
    @InjectRepository(RedemptionAttempt)
    private redemptionAttemptsRepository: Repository<RedemptionAttempt>,
  ) {}

  async execute(query: GetRedemptionsQuery): Promise<RedemptionAttempt[]> {
    const { userId } = query;
    const redemptionAttemptsFound =
      await this.redemptionAttemptsRepository.find({
        where: { userId },
      });

    if (!redemptionAttemptsFound) {
      throw new Error('Redemption history not found');
    }

    return redemptionAttemptsFound;
  }
}
