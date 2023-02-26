import { Art } from 'src/core/arts/entities/art.entity';
import { Collection } from 'src/core/collections/entities/collection.entity';
import { Like } from 'src/core/likes/entities/like.entity';
import { userPicturePlaceholder } from 'src/core/users/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: userPicturePlaceholder,
  })
  picture: string;

  @OneToMany(() => Art, (art) => art.user)
  images: Art[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Collection, (collection) => collection.user)
  collections: Collection;
}
