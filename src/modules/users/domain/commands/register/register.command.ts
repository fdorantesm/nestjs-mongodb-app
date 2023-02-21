import { ICommand } from '@nestjs/cqrs';

import { ProfileEntity } from '../../entities/profile.entity';
import { Scope } from '../../enums/scope.enum';

export class RegisterCommand implements ICommand {
  constructor(
    public email: string,
    public password: string,
    public scopes: Scope[],
    public profile?: ProfileEntity,
  ) {}
}
