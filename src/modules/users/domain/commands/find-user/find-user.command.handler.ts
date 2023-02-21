import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { UserEntity } from '../../entities/user.entity';
import { FindUserCommand } from './find-user.command';

@CommandHandler(FindUserCommand)
export class FindUserCommandHandler implements ICommandHandler {
  constructor(private readonly usersService: UsersService) {}
  public execute(command: FindUserCommand): Promise<UserEntity> {
    return this.usersService.findOne(command.filter);
  }
}
