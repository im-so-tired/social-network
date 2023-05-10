import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { User } from '../user/user.decorator';
import { PostDto } from './posts.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Auth } from '../auth/guards/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/attachedImages',
        filename(
          req,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          callback(
            null,
            Date.now() + '-' + encodeURIComponent(file.originalname),
          );
        },
      }),
    }),
  )
  @Auth
  create(
    @User('id') userId: number,
    @Body() dto: PostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.postsService.create(userId, dto, image);
  }

  @Patch('like/:id')
  @HttpCode(200)
  @Auth
  toggleLike(@User('id') userId: number, @Param('id') id: string) {
    return this.postsService.toggleLike(userId, +id);
  }

  @Get('user/:id')
  @HttpCode(200)
  @Auth
  getUserPosts(@Param('id') userId: string) {
    return this.postsService.getUserPosts(+userId);
  }
}
