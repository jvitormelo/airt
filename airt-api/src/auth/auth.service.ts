import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/common/services/hash.service';
import { forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/core/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,

    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(
      { email },
      { select: ['password', 'id', 'email'] },
    );

    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }

    const isMatch = await this.hashService.isMatch(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;

    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
