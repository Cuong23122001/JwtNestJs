import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from '../schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        MongooseModule.forFeature([{
            name: "User",
            schema: UserSchema
        }])
    ],
    controllers: [UserController],
    providers: [UserService],

})
export class UserModule { }
