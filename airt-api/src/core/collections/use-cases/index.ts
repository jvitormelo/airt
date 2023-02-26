import { AddArtToCollectionUseCase } from 'src/core/collections/use-cases/add-art-to-collection.case';
import { CreateCollectionUseCase } from 'src/core/collections/use-cases/create-collection.case';
import { FindAllUserCollectionsUseCase } from 'src/core/collections/use-cases/find-all-user-collections.case';

export const collectionUseCases = [
  CreateCollectionUseCase,
  FindAllUserCollectionsUseCase,
  AddArtToCollectionUseCase,
];
