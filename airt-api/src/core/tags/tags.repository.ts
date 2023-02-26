import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

export class TagsRepository extends Repository<Tag> {}
