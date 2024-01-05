import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async find(username: string) {
    return await this.userModel.findOne({ username }).lean();
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }
}
