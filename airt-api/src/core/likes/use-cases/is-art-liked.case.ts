import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
@Injectable()
export class IsArtLikedUseCase {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async execute(artId: number, userId: number) {
    const response = await this.likeRepository.findOne({
      where: {
        art: {
          id: artId,
        },
        user: {
          id: userId,
        },
      },
    });

    return { liked: response?.liked ?? false };
  }
}
