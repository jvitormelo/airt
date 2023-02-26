import { InjectRepository } from '@nestjs/typeorm';
import { Art } from '../entities/art.entity';
import { ArtRepository } from '../arts.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindArtUseCase {
  constructor(
    @InjectRepository(Art)
    private imageRepository: ArtRepository,
  ) {}

  async execute(id: number) {
    const image = await this.imageRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['tags', 'user'],
      select: {
        user: {
          name: true,
          id: true,
          picture: true,
        },
      },
    });

    return image;
  }
}
