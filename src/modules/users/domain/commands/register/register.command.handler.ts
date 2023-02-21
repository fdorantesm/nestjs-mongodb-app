import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { UserEntity } from '../../entities/user.entity';
import { RegisterCommand } from './register.command';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler {
  constructor(private readonly usersService: UsersService) {}

  public execute(user: RegisterCommand): Promise<UserEntity> {
    const { email, password, scopes, profile } = user;
    return this.usersService.register(email, password, scopes, profile);
  }
}
