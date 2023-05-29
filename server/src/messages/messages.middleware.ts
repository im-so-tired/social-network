import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MessagesInterceptor implements NestInterceptor {
  constructor(private readonly JwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const socket: Socket = context.switchToWs().getClient();

    const token = socket.handshake.auth.token;
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    const user = this.JwtService.verify(token);
    socket.data.user = user;
    return next.handle();
  }
}
