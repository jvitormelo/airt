import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseConfig } from 'src/database/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataBaseConfig)],
})
export class DatabaseModule {}
