import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post("register")
    async register(
        @Body()
        registerDto: RegisterDto
    ): Promise<any> {
        return this.authService.register(registerDto);
    }
    @Post("login")
    async login(
        @Body()
        loginDto: LoginDto
    ): Promise<any> {
        return this.authService.login(loginDto);
    }
    @UseGuards(AuthGuard())
    @Post("logout/:id")
    async logout(
        @Param('id')
        id: string,
    ): Promise<any> {
        return this.authService.logout(id);
    }
}