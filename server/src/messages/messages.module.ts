import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../configs/jwt.config';

@Module({
  imports: [
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
