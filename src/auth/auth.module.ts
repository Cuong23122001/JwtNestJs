import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from '../schema/user.schema';
import { RefreshTokenStrategy } from './strategies/refresh_token.strategy';
import { AccessTokenStrategy } from './strategies/access_token.strategy';
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({}),
        MongooseModule.forFeature([{
            name: "User",
            schema: UserSchema
        }])],
    controllers: [AuthController],
    providers: [AuthService, RefreshTokenStrategy, AccessTokenStrategy],
})
export class AuthModule { }
