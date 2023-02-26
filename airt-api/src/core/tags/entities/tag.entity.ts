import { Art } from 'src/core/arts/entities/art.entity';
import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryColumn({ unique: true })
  name: string;

  @ManyToMany(() => Art, (image) => image.tags)
  images: Art[];
}
