import { Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/guards/auth.guard';
import { User } from './user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('friend')
  @HttpCode(200)
  @Auth
  getFriends(@User('id') userId: number) {
    return this.userService.getFriends(userId);
  }

  @Get('all')
  @HttpCode(200)
  getAll(@Query('searchTerm') searchTerm?: string) {
    return this.userService.getAll(searchTerm);
  }

  @Get(':id')
  @HttpCode(200)
  getProfile(@Param('id') id: string) {
    return this.userService.byId(+id);
  }

  @Post('friend/:id')
  @HttpCode(200)
  @Auth
  toggleFriend(@User('id') userId: number, @Param('id') friendId: string) {
    return this.userService.toggleFriend(userId, +friendId);
  }

  @Get('posts/friends')
  @HttpCode(200)
  @Auth
  getFriendsPosts(@User('id') userId: number) {
    return this.userService.getFriendsPosts(userId);
  }

  @Get('posts/my')
  @HttpCode(200)
  @Auth
  getMyPosts(@User('id') userId: number) {
    return this.userService.getMyPosts(userId);
  }
}
