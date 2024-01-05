import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(username: string) {
    return await this.usersRepository.find(username);
  }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto);
  }
}
