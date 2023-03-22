import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
@Schema({
    "collection": "UserDemo"
})
export class User {
    @Prop()
    username: String;
    @Prop()
    password: String;
    @Prop()
    name: String;
    @Prop()
    age: Number;
    @Prop()
    address: String;
    @Prop()
    token: [{ type: Object }];
}
export const UserSchema = SchemaFactory.createForClass(User);