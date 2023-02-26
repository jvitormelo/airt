import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from 'src/core/tags/dto/create-tag.dto';
import { Tag } from 'src/core/tags/entities/tag.entity';
import { TagsRepository } from 'src/core/tags/tags.repository';
import { TagDomain } from 'src/domain/tag.domain';
@Injectable()
export class CreateTagUseCase {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: TagsRepository,
  ) {}

  async execute({ name }: CreateTagDto) {
    const tag = new TagDomain(name);

    const savedTag = await this.tagsRepository.save(tag);

    return savedTag;
  }
}
