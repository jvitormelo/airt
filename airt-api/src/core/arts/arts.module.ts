import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BucketService } from 'src/common/services/bucket.service';
import { Like } from '../likes/entities/like.entity';
import { ArtsController } from './arts.controller';
import { ArtRepository } from './arts.repository';
import { Art } from './entities/art.entity';
import { artsUseCases } from './use-cases';

@Module({
  controllers: [ArtsController],
  imports: [TypeOrmModule.forFeature([Art, Like])],
  providers: [BucketService, ArtRepository, ...artsUseCases],
  exports: [...artsUseCases],
})
export class ArtsModule {}
