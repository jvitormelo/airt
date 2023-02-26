import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from 'src/core/collections/entities/collection.entity';
import { collectionUseCases } from 'src/core/collections/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Collection])],
  controllers: [CollectionsController],
  providers: [CollectionsService, ...collectionUseCases],
  exports: [CollectionsService],
})
export class CollectionsModule {}
