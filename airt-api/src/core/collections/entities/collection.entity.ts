import { Art } from 'src/core/arts/entities/art.entity';
import { User } from 'src/core/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.collections)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Art, (art) => art.collections)
  arts: Art[];

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
