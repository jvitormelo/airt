import { InjectRepository } from '@nestjs/typeorm';
import { BucketService } from 'src/common/services/bucket.service';
import { CreateArtDto } from '../dto/create-art.dto';
import { ArtRepository } from '../arts.repository';
import { Injectable } from '@nestjs/common';
import { Art } from '../entities/art.entity';

@Injectable()
export class CreateArtUseCase {
  constructor(
    private bucketService: BucketService,
    @InjectRepository(Art)
    private imageRepository: ArtRepository,
  ) {}

  private formatTags(tags: string[]) {
    return tags.map((tag) => ({
      name: tag.split(' ')[0],
    }));
  }

  public async execute(createImageDto: CreateArtDto, userId: number) {
    {
      const response = await this.bucketService.createPresignedLink(
        createImageDto.name,
      );

      const tags = this.formatTags(createImageDto.tags);

      const { id } = await this.imageRepository.save({
        name: createImageDto.name,
        url: `${response.url}${response.key}`,
        key: response.key,
        user: {
          id: userId,
        },
        tags,
      });

      return { ...response, id };
    }
  }
}
