import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInUserQuery } from '../implementations';
import { User } from 'src/users/entities/user.entity';
import { USER_NOT_FOUND_MESSAGE } from 'src/common/utils/constants';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(SignInUserQuery)
export class SignInUserQueryHandler implements IQueryHandler<SignInUserQuery> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(query: SignInUserQuery): Promise<User> {
    const {
      signInDto: { email },
    } = query;
    const userFound = await this.userRepository.findOne({
      where: { email },
    });

    if (!userFound) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    return userFound;
  }
}
