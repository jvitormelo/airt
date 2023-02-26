import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCollectionDto } from 'src/core/collections/dto/create-collection.dto';
import { Collection } from 'src/core/collections/entities/collection.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateCollectionUseCase {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async execute(
    createCollectionDto: CreateCollectionDto,
    userId: number,
  ): Promise<Collection> {
    const response = await this.collectionRepository.save({
      ...createCollectionDto,
      user: {
        id: userId,
      },
    });

    return {
      ...response,
      user: undefined,
    };
  }
}
