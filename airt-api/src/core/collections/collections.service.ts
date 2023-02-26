import { Injectable } from '@nestjs/common';
import { AddArtToCollectionUseCase } from 'src/core/collections/use-cases/add-art-to-collection.case';
import { CreateCollectionUseCase } from 'src/core/collections/use-cases/create-collection.case';
import { FindAllUserCollectionsUseCase } from 'src/core/collections/use-cases/find-all-user-collections.case';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly createCollectionUseCase: CreateCollectionUseCase,
    private readonly findAllUserCollectionsUseCase: FindAllUserCollectionsUseCase,
    private readonly addArtToCollectionUseCase: AddArtToCollectionUseCase,
  ) {}

  create(createCollectionDto: CreateCollectionDto, userId: number) {
    return this.createCollectionUseCase.execute(createCollectionDto, userId);
  }

  findAllUserCollections(userId: number) {
    return this.findAllUserCollectionsUseCase.execute(userId);
  }

  findAllCollectionArts(collectionId: number) {
    return [];
  }

  addArtToCollection(collectionId: number, artId: number) {
    return this.addArtToCollectionUseCase.execute(collectionId, artId);
  }

  findAll() {
    return `This action returns all collections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
