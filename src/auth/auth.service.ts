import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectModel } from '@nestjs/mongoose/dist';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserDocument } from '../user/schema/user.schema';
import { connectionName } from 'src/constants/modelName.constants';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(connectionName.User)
    private userModel: mongoose.Model<UserDocument>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  /**
   * Register user by username and password
   * @param registerDto validate properties of username and password passed in body
   * @returns message notifying user susscessfully registered
   */
  async register(registerDto: RegisterDto): Promise<any> {
    const { username, password } = registerDto;
    const account = await this.userModel.findOne({ username });
    if (!account) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userModel.create({
        username: username,
        password: hashedPassword,
      });
      return { msg: 'Register successfully!!!' };
    } else {
      return { msg: 'Username is exist' };
    }
  }
  /**
   * User login by username and password
   * @param loginDto Validate properties of username and password passed by body
   * @returns Promise of query from database return user and token
   */
  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const account = await this.userModel.findOne({ username });
    if (account) {
      const isPassword = await bcrypt.compare(password, account.password);
      if (isPassword) {
        const token = await this.getTokens(account._id.toString());
        const refresh_token = token.refresh_token;

        await this.userModel.findByIdAndUpdate(account._id, {
          token: { refresh_token: refresh_token },
        });
        return { account, token };
      } else {
        return { msg: 'Invalid password' };
      }
    } else {
      return { msg: 'Login Fail!!!' };
    }
  }
  /**
   * User logout by user id
   * @param id User id
   * @returns message notifying user successfully logged out
   */
  async logout(id: string): Promise<any> {
    const account = await this.userModel.findById(id).exec();
    if (account) {
      await this.userModel.findByIdAndUpdate(account._id, {
        token: { refresh_token: '' },
      });
      return { msg: 'Logout successfully!!!' };
    } else {
      return { msg: 'Invalid!' };
    }
  }
  /**
   * Get token by user id
   * @param id User id
   * @returns Promise of access token and refresh token from array
   */
  async getTokens(id: string): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const access_token = await this.jwtService.signAsync(
      { id },
      {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get<string>('JWT_ACCESS_TIME'),
      },
    );
    const refresh_token = await this.jwtService.signAsync(
      { id },
      {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get<string>('JWT_REFRESH_TIME'),
      },
    );
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }
}
