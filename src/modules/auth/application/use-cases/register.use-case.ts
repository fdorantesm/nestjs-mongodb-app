import { Injectable } from '@nestjs/common';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { CommandBus } from '@nestjs/cqrs';

import { ProfileEntity } from './../../../users/domain/entities/profile.entity';
import { TokenDto } from './../dtos/token.dto';
import { UserEntity } from './../../../users/domain/entities/user.entity';
import { TokenService } from './../services/token.service';
import {
  FindUserCommand,
  RegisterCommand,
} from 'src/modules/users/domain/commands';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly tokenService: TokenService,
  ) {}

  public async exec(
    email: string,
    password: string,
    name: string,
    nick: string,
  ): Promise<{ user: UserEntity } & TokenDto> {
    const isNotFirst = await this.commandBus.execute<
      FindUserCommand,
      UserEntity
    >(new FindUserCommand());

    const subscriber = [Scope.MATCHES, Scope.TOPS];
    const scopes = isNotFirst ? subscriber : [Scope.ROOT, ...subscriber];

    const formatedEmail = email.toLowerCase();
    const profile = ProfileEntity.create({ name, nick });

    const user = await this.commandBus.execute<RegisterCommand, UserEntity>(
      new RegisterCommand(formatedEmail, password, scopes, profile),
    );

    const token = await this.tokenService.create({
      scopes,
      id: user.uuid,
    });

    return {
      ...token,
      user,
    };
  }
}
