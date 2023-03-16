import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Account } from "./schema/auth.schema";

@Controller('auth')
//export = "make public"
export class AuthController {
    //auth service is automatically created when initializing the controller
    constructor(private readonly authService: AuthService) {

    }
    //Some request from client
    //POST:.../auth/register
    @Post("register")
    async register(
        @Body()
        registerDto: RegisterDto
    ): Promise<{ token: string }> {
        return this.authService.register(registerDto);
    }
    @Post("login")
    async login(
        @Body()
        loginDto: LoginDto
    ): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }
    // @Post("logout")
    // logout() {
    //     return this.authService.logout();
    // }
}