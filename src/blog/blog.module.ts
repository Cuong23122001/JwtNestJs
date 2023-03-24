import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import {
  connectionName,
  nameStrategy,
} from 'src/constants/modelName.constants';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogSchema } from './schema/blog.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: nameStrategy.JWT }),
    MongooseModule.forFeature([
      {
        name: connectionName.Blog,
        schema: BlogSchema,
      },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
