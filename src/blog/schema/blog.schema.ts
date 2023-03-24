import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { modelName } from 'src/constants/modelName.constants';
export type BlogDocument = HydratedDocument<Blog>;
@Schema({
  timestamps: true,
  collection: modelName.Blog,
})
export class Blog {
  @Prop()
  title: string;
  @Prop()
  content: string;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);
