import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ArtsModule } from 'src/core/arts/arts.module';
import { LikesModule } from 'src/core/likes/likes.module';
import { TagsModule } from 'src/core/tags/tags.module';
import { UsersModule } from 'src/core/users/users.module';
import { DatabaseModule } from './database/database.module';
import { CollectionsModule } from 'src/core/collections/collections.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'src/common/config/configuration';

@Module({
  imports: [
    ArtsModule,
    UsersModule,
    AuthModule,
    TagsModule,
    LikesModule,
    DatabaseModule,
    CollectionsModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
