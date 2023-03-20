import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

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