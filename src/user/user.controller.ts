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

    //Create User
    @UseGuards(AuthGuard())
    @Post("create")
    async create(
        @Body()
        createUser: CreateUserDto
    ): Promise<User> {
        return this.userService.createAnUser(createUser);
    }

    //Get All User
    @UseGuards(AuthGuard())
    @Get("getAll")
    async getAll(
    ): Promise<User[]> {
        return this.userService.getAllUser();
    }

    //Get An User By id
    @UseGuards(AuthGuard())
    @Get("get/:id")
    async getAnUser(
        @Param('id')
        id: string,
    ): Promise<User> {
        return this.userService.getAnUser(id);
    }

    //Update an user by Id
    @UseGuards(AuthGuard())
    @Put("update/:id")
    async updateAnUser(
        @Param('id')
        id: string,
        @Body()
        updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.userService.updateAnUser(id, updateUserDto);
    }

    //Delete an user by Id
    @UseGuards(AuthGuard())
    @Delete("delete/:id")
    async deleteUser(
        @Param('id')
        id: string
    ): Promise<User> {
        return this.userService.deleteUser(id);
    }
}