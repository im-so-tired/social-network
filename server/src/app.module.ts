import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: `${path}/upload`,
      serveRoot: '/upload',
    }),
    AuthModule,
    UserModule,
    PostsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
