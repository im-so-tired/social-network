import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Base } from '../../utils/base';
import { UserEntity } from '../../user/user.entity';

@Entity('messages')
export class Message extends Base {
  @Column()
  text: string;
  @CreateDateColumn({ name: 'created_at', default: Date.now() })
  createdAt;
  @ManyToOne(() => UserEntity, (author) => author.posts)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;
}
