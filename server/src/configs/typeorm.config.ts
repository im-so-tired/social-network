import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  database: configService.get('DATABASE'),
  username: configService.get('USER'),
  password: configService.get('PASSWORD'),
  autoLoadEntities: true,
  synchronize: true,
  ssl: true,
});
