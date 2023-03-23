import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CreateUserDto } from "src/dto/createUser.dto";
import { UpdateUserDto } from "src/dto/updateUser.dto";
import { User, UserDocument } from "../schema/user.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectModel("User")
        private userModel: mongoose.Model<UserDocument>) { }

    async createAnUser(createAnUser: CreateUserDto): Promise<User> {
        const user = await this.userModel.create(createAnUser)
        return user;
    }
    async getAllUser(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }
    async getAnUser(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }
    async updateAnUser(id: string, updateUser: UpdateUserDto): Promise<User> {
        const { name, age, address } = updateUser;
        const user = await this.userModel.findByIdAndUpdate(id, {
            name: name,
            age: age,
            address: address
        });
        console.log(user);

        return user;
    }
    async deleteUser(id: string): Promise<any> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        await this.userModel.findByIdAndDelete(id);
        return 'Delete User Successfully!!!';

    }
}