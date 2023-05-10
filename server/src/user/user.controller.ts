import { Controller, Get, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/guards/auth.guard';
import { User } from './user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('friends')
  @HttpCode(200)
  @Auth
  getFriends(@User('id') userId: number, @Query('searchTerm') searchTerm = '') {
    return this.userService.getFriends(userId, searchTerm);
  }

  @Get('all')
  @HttpCode(200)
  getAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.userService.getAll(+page, +limit, searchTerm);
  }

  @Get(':id')
  @HttpCode(200)
  getProfile(@Param('id') id: string) {
    return this.userService.byId(+id);
  }

  @Patch('friend/:id')
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
