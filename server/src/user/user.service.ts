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

  async getAll(searchTerm?: string) {
    const nameParts = searchTerm.split(' ');
    let users = [];

    if (nameParts.length > 1) {
      const firstName = nameParts[0];
      const lastName = nameParts[1];

      users = await this.userRepository
        .createQueryBuilder('user')
        .where(
          `(LOWER(user.firstName) LIKE LOWER(:firstName) AND LOWER(user.lastName) LIKE LOWER(:lastName)) OR (LOWER(user.firstName) LIKE LOWER(:lastName) AND LOWER(user.lastName) LIKE LOWER(:firstName))`,
          {
            firstName: `%${firstName}%`,
            lastName: `%${lastName}%`,
          },
        )
        .getMany();
    } else {
      users = await this.userRepository
        .createQueryBuilder('user')
        .where(
          `LOWER(CONCAT(user.firstName, ' ', user.lastName)) LIKE LOWER(:name)`,
          { name: `%${searchTerm}%` },
        )
        .orWhere(`LOWER(user.firstName) LIKE LOWER(:name)`, {
          name: `%${searchTerm}%`,
        })
        .orWhere(`LOWER(user.lastName) LIKE LOWER(:name)`, {
          name: `%${searchTerm}%`,
        })
        .getMany();
    }

    return users;
  }

  async byId(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User is not found');
    return this.returnUserFields(user);
  }

  async byIdWithPosts(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        posts: true,
      },
    });
    if (!user) throw new NotFoundException('User is not found');
    return this.returnUserFields(user);
  }

  async toggleFriend(userId: number, friendId: number) {
    const user = await this.byId(userId);
    await this.byId(friendId);
    const isFriend = user.friends.some((fr) => fr === friendId);
    isFriend
      ? (user.friends = user.friends.filter((fr) => fr !== friendId))
      : user.friends.push(friendId);
    await this.userRepository.save(user);
    return user.friends;
  }

  async getMyPosts(userId: number) {
    const user = await this.byIdWithPosts(userId);
    return {
      posts: user.posts,
    };
  }

  async getFriendsPosts(userId: number) {
    const user = await this.byId(userId);
    const posts = [];
    for (const friend of user.friends) {
      const friendProfile = await this.byIdWithPosts(friend);
      posts.push(...friendProfile.posts);
    }
    posts.sort((a, b) => b - a);
    return {
      posts,
    };
  }

  async getFriends(userId: number) {
    const user = await this.byId(userId);
    const friends = [];
    for (const friend of user.friends) {
      const friendProfile = await this.byId(friend);
      friends.push(friendProfile);
    }
    return {
      friends,
    };
  }

  returnUserFields(user: UserEntity) {
    const { password, createdAt, updatedAt, ...rest } = user;
    return rest;
  }
}
