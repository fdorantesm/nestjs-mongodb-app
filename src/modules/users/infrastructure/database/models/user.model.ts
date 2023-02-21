import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Scope } from '../../../domain/enums/scope.enum';

@Schema({
  collection: 'users',
  timestamps: true,
  autoIndex: true,
})
export class UserModel extends Document {
  @Prop({ type: String, unique: true })
  public uuid: string;

  @Prop({ type: String, unique: true })
  public email: string;

  @Prop({ type: String, select: false })
  public password: string;

  @Prop({ type: Array })
  public scopes: Scope[];

  @Prop({ type: Object })
  public profile?: {
    name: string;
    nick: string;
  };
}

const UserSchema = SchemaFactory.createForClass(UserModel);

export { UserSchema };
