import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TAGS_FIELD } from 'src/core/tags/constants/tags-search-field.constant';
import { FindAllTagsDTO } from 'src/core/tags/dto/find-all-tags.dto';
import { Tag } from 'src/core/tags/entities/tag.entity';
import { TagsRepository } from 'src/core/tags/tags.repository';

interface TagWithImagesCount extends Tag {
  count: number;
}

@Injectable()
export class FindAllTagsUseCase {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: TagsRepository,
  ) {}

  async execute({
    limit = 5,
    page = 1,
    order = 'ASC' as const,
    searchTerm,
    field,
  }: FindAllTagsDTO) {
    const take = limit;
    const skip = limit * (page - 1);

    const query = this.tagsRepository
      .createQueryBuilder('tag')
      .addSelect(
        `(SELECT COUNT(*) FROM art_tags_tag it WHERE it."tagName" = tag.name)`,
        'count',
      )
      .addSelect('tag.name', 'name')
      .skip(skip)
      .take(take)
      .orderBy(field === TAGS_FIELD.NAME ? 'tag.name' : 'count', order);

    if (searchTerm) {
      query.where('tag.name LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });
    }

    const [records, total] = await Promise.all([
      query.getRawMany(),
      this.tagsRepository.count(),
    ]);

    const tags = records.map((tag: TagWithImagesCount) => ({
      ...tag,
      name: tag.name,
      count: +tag.count,
    }));

    const pagination = {
      currentPage: page,
      limit,
      haveNextPage: total > page * limit,
      total,
    };

    return { tags, pagination };
  }
}
