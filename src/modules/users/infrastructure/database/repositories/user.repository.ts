import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { ProfileEntity } from './../../../domain/entities/profile.entity';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  public async findCustomers(
    filter: Partial<UserEntity>,
  ): Promise<UserEntity[]> {
    const users = await this.userModel
      .find({ ...filter, profile: { $exists: true } })
      .select('-password')
      .exec();

    return users.map(
      (user) =>
        new UserEntity(
          user.uuid,
          user.email,
          user.password,
          user.scopes,
          user.profile ? ProfileEntity.create(user.profile) : undefined,
        ),
    );
  }

  public async findOne(filter: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.userModel
      .findOne(filter)
      .select('-password')
      .exec();
    if (user) {
      return new UserEntity(
        user.uuid,
        user.email,
        user.password,
        user.scopes,
        user.profile ? ProfileEntity.create(user.profile) : undefined,
      );
    }
  }

  public async getLoginData(email: string): Promise<UserEntity> {
    const user = await this.userModel
      .findOne({ email })
      .select({ uuid: 1, scopes: 1 })
      .exec();
    if (user) {
      return new UserEntity(
        user.uuid,
        user.email,
        user.password,
        user.scopes,
        user.profile ? ProfileEntity.create(user.profile) : undefined,
      );
    }
  }

  public async getCryptedPassword(email: string): Promise<string | void> {
    const user = await this.userModel
      .findOne({ email })
      .select({ password: 1 })
      .exec();
    if (user) {
      return user.password;
    }
  }

  public async findById(uuid: string): Promise<UserEntity> {
    const user = await this.findOne({ uuid });
    if (user) {
      return user;
    }
  }

  public async create(userEntity: UserEntity): Promise<UserEntity> {
    const user = await this.userModel.create(userEntity);
    if (user) {
      return new UserEntity(
        user.uuid,
        user.email,
        undefined,
        user.scopes,
        user.profile ? ProfileEntity.create(user.profile) : undefined,
      );
    }
  }

  public async updateProfile(userId: string, profile: Partial<ProfileEntity>) {
    const profileData = {};

    Object.keys(profile).map((field) => {
      profileData[`profile.${field}`] = profile[field];
    });

    await this.userModel.updateOne({ uuid: userId }, profileData);
    const user = await this.findById(userId);
    return user.profile;
  }
}
