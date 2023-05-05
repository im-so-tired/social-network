import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Base } from '../utils/base';
import { PostsEntity } from '../posts/posts.entity';
import { GenderType } from '../utils/gender.types';

@Entity('user')
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ default: '', name: 'avatar_path' })
  avatarPath: string;
  @Column()
  age: number;
  @Column({ default: '' })
  city: string;
  @Column({ default: '' })
  university: string;
  @Column()
  gender: GenderType;
  @OneToMany(() => PostsEntity, (post) => post.author)
  @JoinColumn({ name: 'posts' })
  posts: PostsEntity[];
  @Column('integer', { array: true, default: [] })
  friends: number[];
}
