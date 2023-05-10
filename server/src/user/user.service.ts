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

  async getAll(page: number, limit: number, searchTerm?: string) {
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
    users.sort((a, b) => {
      if (a.firstName > b.firstName) return 1;
      if (a.firstName < b.firstName) return -1;
      return 0;
    });
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      totalPages: Math.ceil(users.length / limit),
      users: users.slice(startIndex, endIndex),
    };
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
      const friendPosts = friendProfile.posts.map((post) => ({
        ...post,
        lastUpdate: +post.lastUpdate,
        author: {
          id: friendProfile.id,
          fistName: friendProfile.firstName,
          lastName: friendProfile.lastName,
          avatarPath: friendProfile.avatarPath,
        },
      }));
      posts.push(...friendPosts);
    }
    posts.sort((a, b) => +b.lastUpdate - +a.lastUpdate);
    return posts;
  }

  async getFriends(userId: number, searchTerm: string) {
    const user = await this.byId(userId);
    const friends = [];
    for (const friend of user.friends) {
      const friendProfile = await this.byId(friend);
      friends.push(friendProfile);
    }
    return friends;
  }

  returnUserFields(user: UserEntity) {
    const { password, createdAt, updatedAt, ...rest } = user;
    if (rest.posts && rest.posts.length)
      rest.posts = rest.posts.map((post) => ({
        ...post,
        lastUpdate: +post.lastUpdate,
      }));
    return rest;
  }
}
