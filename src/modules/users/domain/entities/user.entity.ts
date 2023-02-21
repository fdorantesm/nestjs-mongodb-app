import { Scope } from '../enums/scope.enum';
import { ProfileEntity } from './profile.entity';

export class UserEntity {
  constructor(
    public uuid: string,
    public email: string,
    public password: string,
    public scopes: Scope[],
    public profile?: ProfileEntity,
  ) {}
}
