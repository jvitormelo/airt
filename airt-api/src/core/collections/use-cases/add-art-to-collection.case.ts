import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Art } from 'src/core/arts/entities/art.entity';
import { Collection } from 'src/core/collections/entities/collection.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddArtToCollectionUseCase {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async execute(collectionId: number, artId: number) {
    const foundCollection = await this.collectionRepository.findOne({
      where: {
        id: collectionId,
      },
      relations: ['arts'],
    });

    if (!foundCollection) {
      throw new Error('Collection not found');
    }

    return this.collectionRepository.save({
      ...foundCollection,
      arts: [...(foundCollection.arts ?? []), { id: artId } as Art],
    });
  }
}
