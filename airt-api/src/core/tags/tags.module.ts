import { Module } from '@nestjs/common';

import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { tagUseCases } from 'src/core/tags/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [...tagUseCases],
  exports: [...tagUseCases],
})
export class TagsModule {}
