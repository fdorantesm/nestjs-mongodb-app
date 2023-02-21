import { Schema } from 'mongoose';

export type Instance = {
  name: string;
  schema: Schema<any>;
};
