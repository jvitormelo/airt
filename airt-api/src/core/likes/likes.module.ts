import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from 'src/core/likes/entities/like.entity';

import { LikesController } from './likes.controller';
import { likesUseCases } from './use-cases';
@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikesController],
  providers: [...likesUseCases],
  exports: [...likesUseCases],
})
export class LikesModule {}
