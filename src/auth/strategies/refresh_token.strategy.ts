import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Account } from '../schema/auth.schema';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel("Account")
        private userModel: Model<Account>,
        config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>("JWT_REFRESH_SECRET"),
        });
    }

    async validate(payload) {
        const { id } = payload;

        const user = await this.userModel.findById(id);

        if (!user) {
            throw new UnauthorizedException('Login first to access this endpoint.');
        }

        return user;
    }
}