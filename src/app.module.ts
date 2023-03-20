import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }), MongooseModule.forRoot(process.env.MONGOOSE_DB), AuthModule, UserModule, BlogModule],
})
export class AppModule { }
