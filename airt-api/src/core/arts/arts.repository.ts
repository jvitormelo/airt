import { Repository } from 'typeorm';
import { Art } from './entities/art.entity';

export class ArtRepository extends Repository<Art> {}
