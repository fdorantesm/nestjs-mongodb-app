import { ProfileEntity } from './../../../domain/entities/profile.entity';
import { Scope } from '../../../domain/enums/scope.enum';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

import {
  IdGeneratorService,
  ID_GENERATOR_SERVICE,
} from '../../../../../../libs/id-generator/src/id-generator.interface';
import { PasswordService } from '../../../application/services/password.service';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,

    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  public findOne(filter: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(filter);
  }

  public async findCustomers(
    filter: Partial<UserEntity>,
  ): Promise<UserEntity[]> {
    const users = await this.userRepository.findCustomers(filter);
    return users;
  }

  public async getLoginData(email: string): Promise<UserEntity> {
    const user = await this.userRepository.getLoginData(email);
    return user;
  }

  public findById(uuid: string): Promise<UserEntity> {
    return this.userRepository.findById(uuid);
  }

  public async checkPassword(
    email: string,
    password: string,
  ): Promise<boolean> {
    const cryptedPassword = await this.userRepository.getCryptedPassword(email);
    if (cryptedPassword) {
      const passwordMatches = await this.passwordService.match(
        password,
        cryptedPassword,
      );

      return passwordMatches;
    }
  }

  public async register(
    email: string,
    plainPassword: string,
    scopes: Scope[],
    profile?: ProfileEntity,
  ): Promise<UserEntity> {
    const uuid = this.idGeneratorService.exec();
    const password = await this.passwordService.generate(plainPassword);
    const emailAlreadyRegistered = await this.userRepository.findOne({ email });

    if (emailAlreadyRegistered) {
      throw new ConflictException('users.email_already_registered');
    }

    const user = await this.userRepository.create({
      uuid,
      email,
      password,
      scopes,
      profile,
    });
    return user;
  }

  public async updateProfile(userId: string, data: Partial<ProfileEntity>) {
    return this.userRepository.updateProfile(userId, data);
  }
}
