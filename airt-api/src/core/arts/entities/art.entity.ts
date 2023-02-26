import { Collection } from 'src/core/collections/entities/collection.entity';
import { Like } from 'src/core/likes/entities/like.entity';
import { Tag } from 'src/core/tags/entities/tag.entity';
import { User } from 'src/core/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Art {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default: 0,
  })
  views: number;

  @Column()
  url: string;

  @Column({
    default: '',
  })
  key: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.images)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.images)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Like, (like) => like.art)
  likes: Like[];

  @ManyToMany(() => Collection, (collection) => collection.arts)
  @JoinTable()
  collections: Collection[];
}
