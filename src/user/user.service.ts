import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoRepository } from 'typeorm';
import { User } from './user.mongo.entity';
import { FeishuUserInfo } from '@/user/feishu/feishu.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  createOrSave(user) {
    return this.userRepository.save(user);
  }

  async createOrUpdateByFeishu(feishuUserInfo: FeishuUserInfo) {
    return await this.userRepository.save(feishuUserInfo);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  // 查询所有用户
  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
