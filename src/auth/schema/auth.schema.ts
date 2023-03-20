import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type AccountDocument = HydratedDocument<Account>;
@Schema({
    "collection": "AccountDemo"
})
export class Account {
    @Prop({ required: true })
    username: String;
    @Prop({ required: true })
    password: String;
    @Prop()
    token: [{ type: Object }];
}
export const AccountSchema = SchemaFactory.createForClass(Account);
// export class Account { }