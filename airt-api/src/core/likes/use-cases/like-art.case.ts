import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';

@Injectable()
export class LikeArtUseCase {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async execute(artId: number, userId: number, liked: boolean) {
    const foundedLike = await this.likeRepository.findOne({
      where: {
        art: {
          id: artId,
        },
        user: {
          id: userId,
        },
      },
    });

    if (foundedLike) {
      foundedLike.liked = liked;
      await this.likeRepository.save(foundedLike);
      return { liked: foundedLike.liked };
    }

    const response = await this.likeRepository.save({
      user: {
        id: userId,
      },
      liked,
      art: {
        id: artId,
      },
    });

    return { liked: response.liked };
  }
}
