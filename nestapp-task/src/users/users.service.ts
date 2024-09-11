import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './entities/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';

export type result = {
  message: string;
  error: boolean;
  result?: any;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<result> {
    let result: result = { message: '', error: false };

    try {
      result.message = 'No user exists';
      const users = await this.userModel.find();

      if (users.length > 0) {
        result.message = 'All users found';
        result.result = users;
      }

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        result.message = error.message;
      }

      throw new InternalServerErrorException(result.message);
    }
  }

  async findOne(id: string): Promise<result> {
    let result: result = { message: '', error: false };

    try {
      result.message = 'User does not exist';
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new NotFoundException(result.message);
      }

      result.message = 'User found';
      result.result = user;

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        result.message = error.message;
      }

      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException(result.message);
      }

      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<result> {
    let result: result = { message: '', error: false };

    try {
      result.message = 'User does not exist';
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new NotFoundException(result.message);
      }

      result.message = 'User found';
      result.result = user;
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        result.message = error.message;
      }

      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException(result.message);
      }

      throw error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<result> {
    let result: result = { message: '', error: false };

    try {
      const newUser = await this.userModel.create(createUserDto);

      result.message = 'User created successfully';
      result.result = newUser;
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        result.message = error.message;
      }

      throw new InternalServerErrorException(result.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<result> {
    let result: result = { message: '', error: false };

    try {
      result.message = 'User does not exist';
      const foundUser = await this.userModel.findById(id);

      if (!foundUser) {
        throw new NotFoundException(result.message);
      }

      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        { new: true },
      );

      result.message = 'User updated successfully';
      result.result = updatedUser;
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        result.message = error.message;
      }

      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException(result.message);
      }

      throw error;
    }
  }

  async delete(id: string): Promise<result> {
    let result: result = { message: '', error: false };

    try {
      result.message = 'User does not exist';
      const foundUser = await this.userModel.findById(id);

      if (!foundUser) {
        throw new NotFoundException(result.message);
      }

      await this.userModel.findByIdAndDelete(id);

      result.message = 'User deleted successfully';
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        result.message = error.message;
      }

      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException(result.message);
      }

      throw error;
    }
  }

  async findAllLoggedIn() {
    let result: result = { message: '', error: false };

    try {
      const allLoggedInUsers = await this.userModel.find({
        is_logged_in: true,
      });

      result.message = 'Found all logged in users';
      result.result = allLoggedInUsers;
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        result.message = error.message;
      }

      throw new InternalServerErrorException(result.message);
    }
  }
}
