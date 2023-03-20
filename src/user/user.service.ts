import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CreateAnUserDto } from "./dto/createAnUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { User, UserDocument } from "./schema/user.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectModel("User")
        private userModel: mongoose.Model<UserDocument>) { }

    async createAnUser(createAnUser: User): Promise<User> {
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
    async updateAnUser(id: string, updateUser: User): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(id, updateUser);
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