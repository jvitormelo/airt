import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/core/tags/entities/tag.entity';
import { TagsRepository } from 'src/core/tags/tags.repository';
import { TagDomain } from 'src/domain/tag.domain';

@Injectable()
export class CreateTagBulkUseCase {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: TagsRepository,
  ) {}

  async execute(tags: string[]) {
    const tagsToCreate = tags.map((tagName) => new TagDomain(tagName));

    const createdTags = await this.tagsRepository.save(tagsToCreate);

    return createdTags;
  }
}
