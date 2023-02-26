import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from 'src/core/collections/entities/collection.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllUserCollectionsUseCase {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
  ) {}

  async execute(userId: number): Promise<Collection[]> {
    return this.collectionsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
