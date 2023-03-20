import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt/dist";
import { InjectModel } from "@nestjs/mongoose/dist";
import mongoose from "mongoose";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Account, AccountDocument } from "./schema/auth.schema";
@Injectable()//this is "Dependency Injection"
export class AuthService {
    constructor(
        @InjectModel("Account")
        private accountModel: mongoose.Model<AccountDocument>,
        private jwtService: JwtService,
        private config: ConfigService,
    ) { }

    async register(registerDto: RegisterDto): Promise<any> {
        const { username, password } = registerDto;
        const account = await this.accountModel.findOne({ username }).exec();
        if (!account) {
            await this.accountModel.create({
                username,
                password
            })
            return { msg: "Register successfully!!!" };
        } else {
            return { msg: "Username is exist" };
        }

    }
    async login(loginDto: LoginDto): Promise<any> {
        const { username, password } = loginDto;
        const account = await this.accountModel.findOne({ username, password }).exec();
        if (account) {
            const token = await this.getTokens(account._id.toString());
            const refresh_token = token.refresh_token;

            await this.accountModel.findByIdAndUpdate(account._id, {
                token: { refresh_token: refresh_token }
            })

            return { account, token };
        } else {
            return { msg: "Login Fail!!!" };
        }

    }
    async logout(id: string): Promise<any> {
        const account = await this.accountModel.findById(id).exec();
        if (account) {
            await this.accountModel.findByIdAndUpdate(account._id, {
                token: { refresh_token: "" }
            })

            return { msg: "Logout successfully!!!" };
        } else {
            return { msg: "Invalid!" };
        }
    }

    async getTokens(id: string): Promise<{
        access_token: string,
        refresh_token: string
    }> {
        const access_token = await this.jwtService.signAsync({ id }, {
            secret: this.config.get<string>("JWT_ACCESS_SECRET"),
            expiresIn: this.config.get<string>("JWT_ACCESS_TIME"),
        })
        const refresh_token = await this.jwtService.signAsync({ id }, {
            secret: this.config.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.config.get<string>("JWT_REFRESH_TIME"),
        })

        return {
            access_token: access_token,
            refresh_token: refresh_token,
        };
    }
}
