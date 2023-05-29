import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { OnModuleInit, UseInterceptors } from '@nestjs/common';
import { MessagesInterceptor } from './messages.middleware';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseInterceptors(MessagesInterceptor)
export class MessagesGateway implements OnModuleInit {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => console.log(socket.id));
  }

  @SubscribeMessage('createMessage')
  create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.messagesService.create(createMessageDto);
  }

  @SubscribeMessage('findChatMessage')
  findAll(
    @MessageBody('userId') userId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.messagesService.findAll();
  }
}
