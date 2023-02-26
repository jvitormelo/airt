import { CreateTagBulkUseCase } from 'src/core/tags/use-cases/create-tag-bulk.case';
import { CreateTagUseCase } from 'src/core/tags/use-cases/create-tag.case';
import { FindAllTagsUseCase } from 'src/core/tags/use-cases/find-all-tags.case';

export const tagUseCases = [
  CreateTagBulkUseCase,
  CreateTagUseCase,
  FindAllTagsUseCase,
];
