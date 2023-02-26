import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtsSort } from 'src/core/arts/constants/sort';
import { In } from 'typeorm';
import { ArtRepository } from '../arts.repository';
import { Art } from '../entities/art.entity';

@Injectable()
export class FindAllArtsUseCase {
  constructor(
    @InjectRepository(Art)
    private imageRepository: ArtRepository,
  ) {}

  async execute(
    limit = 10,
    page = 1,
    sortBy: ArtsSort = ArtsSort.RECENT,
    tags: string[] = [],
  ) {
    const take = limit;
    const skip = limit * (page - 1);

    const [result, count] = await this.imageRepository.findAndCount({
      relations: ['tags', 'likes'],

      where: tags.length
        ? {
            tags: {
              name: In(tags),
            },
          }
        : {},
      skip,
      order: {
        createdAt: sortBy === ArtsSort.RECENT ? 'DESC' : 'ASC',
      },
      take,
    });

    const haveNextPage = count > page * limit;

    return { data: result, nextPage: page + 1, haveNextPage };
  }
}
