import { Injectable } from '@nestjs/common';

import { UserEntity } from './../../../domain/entities/user.entity';
import { UsersService } from '../../../infrastructure/database/services/users.service';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async exec(filter: Partial<UserEntity>) {
    const users = this.usersService.findCustomers(filter);
    return users;
  }
}
