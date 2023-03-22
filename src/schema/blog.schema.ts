import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type BlogDocument = HydratedDocument<Blog>;
@Schema({
    "collection": "BlogDemo"
})
export class Blog {
    @Prop({ required: true })
    title: String;
    @Prop({ required: true })
    content: String;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);