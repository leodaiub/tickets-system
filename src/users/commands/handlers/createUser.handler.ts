import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCommand } from '../implementations';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Partial<User> & { token: string }> {
    const { user } = command;
    const userExists = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }
    const savedUser = await this.userRepository.save(user);
    const token = this.jwtService.sign(savedUser.id);
    delete savedUser.password;
    return { ...savedUser, token };
  }
}
