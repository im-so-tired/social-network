import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { PostDto } from './posts.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, dto: PostDto, image: Express.Multer.File) {
    console.log(userId);
    const newPost = this.postsRepository.create({
      ...dto,
      lastUpdate: Date.now(),
      author: { id: userId },
      image: image ? encodeURIComponent(image.filename) : '',
    });
    const post = await this.postsRepository.save(newPost);
    return this.returnPostFields(post);
  }

  async getUserPosts(userId: number) {
    await this.userService.byId(userId);
    const posts = await this.postsRepository.find({
      where: { author: { id: userId } },
      relations: {
        author: true,
      },
    });

    return posts.map((post) => this.returnPostFields(post));
  }

  async toggleLike(userId: number, id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
      relations: {
        author: true,
      },
    });
    if (!post) throw new NotFoundException('Post is not found!');
    const isLiked = post.likes.some((like) => like === userId);
    isLiked
      ? (post.likes = post.likes.filter((like) => like !== userId))
      : post.likes.push(userId);
    await this.postsRepository.save(post);
    return this.returnPostFields(post);
  }

  returnPostFields(post: PostsEntity) {
    const { createdAt, updatedAt, author, ...rest } = post;
    rest.lastUpdate = +rest.lastUpdate;
    return {
      ...rest,
      author: {
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
        avatarPath: author.avatarPath,
      },
    };
  }
}
