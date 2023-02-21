import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { FindUserCommand } from 'src/modules/users/domain/commands';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { TokenPayloadDto } from '../dtos/token-payload.dto';

@Injectable()
export class ValidateBackofficeTokenUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  public async exec(userId: string): Promise<TokenPayloadDto> {
    const user = await this.commandBus.execute<FindUserCommand, UserEntity>(
      new FindUserCommand({ uuid: userId }),
    );

    if (!user) {
      throw new UnauthorizedException('auth.invalid_credentials');
    }

    return {
      id: user.uuid,
      scopes: user.scopes,
    };
  }
}
