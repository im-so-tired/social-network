import { IsString } from 'class-validator';

export class PostDto {
  @IsString()
  title: string;
  message?: string;
}
