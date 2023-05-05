import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { PostDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  async create(
    userId: number,
    { message }: PostDto,
    image: Express.Multer.File,
  ) {
    const newPost = this.postsRepository.create({
      message,
      lastUpdate: Date.now(),
      author: { id: userId },
      image: image ? encodeURIComponent(image.filename) : '',
    });
    const post = await this.postsRepository.save(newPost);
    return this.returnPostFields(post);
  }

  async getUserPosts(userId: number) {
    return await this.postsRepository.findBy({ author: { id: userId } });
  }

  async toggleLike(userId: number, id: number) {
    const post = await this.postsRepository.findOneBy({
      id,
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
    const { createdAt, updatedAt, ...rest } = post;
    return rest;
  }
}
