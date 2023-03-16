import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { } from 'mongoose';
import { config } from 'process';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountSchema } from './schema/auth.schema';
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>("JWT_ACCESS_SECRET"),
                    signOptions: {
                        expiresIn: config.get<string | number>("JWT_ACCESS_TIME"),
                    }
                }
            }
        }),
        MongooseModule.forFeature([{
            name: "Account",
            schema: AccountSchema
        }])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
