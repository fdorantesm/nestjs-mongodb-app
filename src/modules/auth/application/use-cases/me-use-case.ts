import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FindUserCommand } from 'src/modules/users/domain/commands';

import { UserEntity } from './../../../users/domain/entities/user.entity';

@Injectable()
export class MeUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  public async exec(userId: string): Promise<UserEntity> {
    const user = await this.commandBus.execute<FindUserCommand, UserEntity>(
      new FindUserCommand({ uuid: userId }),
    );
    return user;
  }
}
