import { Injectable, UnauthorizedException } from '@nestjs/common';

import { TokenService } from './../services/token.service';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { TokenDto } from '../dtos/token.dto';
import { CommandBus } from '@nestjs/cqrs';
import {
  CheckUserPasswordCommand,
  GetLoginDataCommand,
} from 'src/modules/users/domain/commands';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly tokenService: TokenService,
  ) {}

  public async exec(email: string, password: string): Promise<TokenDto> {
    const formatedEmail = email.toLowerCase();

    const hasValidCredentials = await this.commandBus.execute<
      CheckUserPasswordCommand,
      boolean
    >(new CheckUserPasswordCommand(formatedEmail, password));

    if (!hasValidCredentials) {
      throw new UnauthorizedException('users.invalid_credentials');
    }

    const user = await this.commandBus.execute<GetLoginDataCommand, UserEntity>(
      new GetLoginDataCommand(formatedEmail),
    );

    const tokenPayload: TokenPayloadDto = {
      id: user.uuid,
      scopes: user.scopes,
    };

    const token = await this.tokenService.create(tokenPayload);

    return token;
  }
}
