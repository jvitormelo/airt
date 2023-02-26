import { FindLikedArtsUseCase } from 'src/core/arts/use-cases/find-liked-arts.case';
import { CreateArtUseCase } from './create-art.case';
import { FindAllArtsUseCase } from './find-all-arts.case';
import { FindArtUseCase } from './find-art.case';

export const artsUseCases = [
  CreateArtUseCase,
  FindAllArtsUseCase,
  FindArtUseCase,
  FindLikedArtsUseCase,
];
