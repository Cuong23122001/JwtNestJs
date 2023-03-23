import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
@Schema({
  collection: 'UserDemo',
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
