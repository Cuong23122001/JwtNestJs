import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
@Schema({
    "collection": "UserDemo"
})
export class User {
    @Prop({ required: true })
    name: String;
    @Prop({ required: true })
    age: Number;
    @Prop({ required: true })
    address: String;
}
export const UserSchema = SchemaFactory.createForClass(User);
// export class Account { }