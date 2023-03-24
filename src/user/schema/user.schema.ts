import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { modelName } from '../../constants/modelName.constants';
export type UserDocument = HydratedDocument<User>;
@Schema({
  collection: modelName.User,
})
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  name: string;
  @Prop()
  age: number;
  @Prop()
  address: string;
  @Prop()
  token: [{ type: object }];
}
export const UserSchema = SchemaFactory.createForClass(User);
