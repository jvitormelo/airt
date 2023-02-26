import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HashService } from 'src/common/services/hash.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthController } from './auth.controller';

import { JwtStrategy } from './strategies/jwt.strategy';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/core/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/common/config/configuration';

@Module({
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService<EnvVariables>) => ({
        secret: configService.get('jwtSecret'),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, HashService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
