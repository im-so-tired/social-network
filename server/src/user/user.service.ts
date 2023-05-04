import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async byId(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        posts: true,
      },
    });
    if (!user) throw new NotFoundException('User is not found');
    return user;
  }
}
