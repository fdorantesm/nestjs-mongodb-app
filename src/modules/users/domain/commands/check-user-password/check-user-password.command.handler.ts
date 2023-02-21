import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';

import { CheckUserPasswordCommand } from './check-user-password.command';

@CommandHandler(CheckUserPasswordCommand)
export class CheckUserPasswordCommandHandler implements ICommandHandler {
  constructor(private readonly usersService: UsersService) {}
  public execute(command: CheckUserPasswordCommand): Promise<boolean> {
    const { email, password } = command;
    return this.usersService.checkPassword(email, password);
  }
}
