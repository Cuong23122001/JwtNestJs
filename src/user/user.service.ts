import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { connectionName } from 'src/constants/modelName.constants';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(connectionName.User)
    private userModel: mongoose.Model<UserDocument>,
  ) {}
  /**
   * Create a new user
   * @param createAnUser Validate properties passed in body
   * @returns Promise of user is created from database
   */
  async createAnUser(createAnUser: CreateUserDto): Promise<User> {
    const { username, password, name, age, address } = createAnUser;
    const user = await this.userModel.findOne({ username: username });
    if (user) {
      throw new NotFoundException('User already exist!!!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      username: username,
      password: hashedPassword,
      name: name,
      age: age,
      address: address,
    });
    return newUser;
  }
  /**
   * Get all user from db
   * @returns Promise of array from database return user
   */
  async getAllUser(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }
  /**
   * Get user by user id
   * @param id User id
   * @returns Promise of query from database return user
   */
  async getAnUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
  /**
   * Update user by user id
   * @param id User id
   * @param updateUserDto Validate properties passed in body
   * @return Promise of query from db return user
   */
  async updateAnUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, age, address } = updateUserDto;
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const updateUser = await this.userModel.findByIdAndUpdate(id, {
      name: name,
      age: age,
      address: address,
    });
    return updateUser;
  }
  /**
   * Delete User by user id
   * @param id User id
   * @returns message confirm the user has been deleted
   */
  async deleteUser(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    await this.userModel.findByIdAndDelete(id);
    return 'Delete User Successfully!!!';
  }
}
