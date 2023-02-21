import { ICommand } from '@nestjs/cqrs';

import { UserEntity } from '../../entities/user.entity';

export class FindUserCommand implements ICommand {
  constructor(public filter?: Partial<UserEntity>) {}
}
