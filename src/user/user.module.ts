import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from 'src/auth/strategies/access_token.strategy';
import { UserSchema } from './schema/user.schema';
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
