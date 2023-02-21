import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { UserEntity } from '../../entities/user.entity';
import { GetLoginDataCommand } from './get-login-data.command';

@CommandHandler(GetLoginDataCommand)
export class GetLoginDataCommandHandler implements ICommandHandler {
  constructor(private readonly usersService: UsersService) {}

  public execute(user: GetLoginDataCommand): Promise<UserEntity> {
    return this.usersService.getLoginData(user.email);
  }
}
