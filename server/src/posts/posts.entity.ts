import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../utils/base';
import { UserEntity } from '../user/user.entity';

@Entity('posts')
export class PostsEntity extends Base {
  @ManyToOne(() => UserEntity, (author) => author.posts)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;
  @Column()
  title: string;
  @Column({ default: '' })
  message: string;
  @Column({ name: 'last_update', default: Date.now(), type: 'bigint' })
  lastUpdate: number;
  @Column({ default: '' })
  image: string;
  @Column('integer', { array: true, default: [] })
  likes: number[];
}
