import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtRepository } from 'src/core/arts/arts.repository';
import { Art } from 'src/core/arts/entities/art.entity';

@Injectable()
export class FindLikedArtsUseCase {
  constructor(
    @InjectRepository(Art)
    private readonly artRepository: ArtRepository,
  ) {}

  async execute(userId: number) {
    return this.artRepository.find({
      where: {
        likes: {
          liked: true,
          user: {
            id: userId,
          },
        },
      },
    });
  }
}
