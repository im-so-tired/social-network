import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from './user.entity';

export const User = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<{ user: UserEntity }>();
    const user = req.user;
    return data ? user[data] : user;
  },
);
