import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { User } from '../schema/user.schema';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(AuthGuard())
    @Post("create")
    async create(
        @Body()
        createUser: CreateUserDto
    ): Promise<User> {
        return this.userService.createAnUser(createUser);
    }

    @UseGuards(AuthGuard())
    @Get("getAll")
    async getAll(
    ): Promise<User[]> {
        return this.userService.getAllUser();
    }

    @UseGuards(AuthGuard())
    @Get("get/:id")
    async getAnUser(
        @Param('id')
        id: string,
    ): Promise<User> {
        return this.userService.getAnUser(id);
    }

    // @UseGuards(AuthGuard())
    @Put("update/:id")
    async updateAnUser(
        @Param('id')
        id: string,
        @Body()
        updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.userService.updateAnUser(id, updateUserDto);
    }

    @UseGuards(AuthGuard())
    @Delete("delete/:id")
    async deleteUser(
        @Param('id')
        id: string
    ): Promise<User> {
        return this.userService.deleteUser(id);
    }
}