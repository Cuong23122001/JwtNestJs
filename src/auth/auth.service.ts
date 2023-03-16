import { Injectable } from "@nestjs/common";
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
        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto): Promise<{ token: string }> {
        const { username, password } = registerDto;
        const user = await this.accountModel.create({
            username,
            password
        })
        const token = this.jwtService.sign({ id: user._id })
        return { token };
    }

    // async register(acc: Account): Promise<Account> {
    //     const account = await this.accountModel.create(acc);
    //     return account;
    // }
    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { username, password } = loginDto;

        const account = await this.accountModel.findOne({ username, password }).exec();
        const token = this.jwtService.sign({ id: account._id })
        return { token };
    }
    logout() {
        return {
            message: "Logout"
        }
    }
}
