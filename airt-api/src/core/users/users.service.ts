import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/common/services/hash.service';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { AuthService } from 'src/auth/auth.service';
import { forwardRef, Inject } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';

interface FindOneParams {
  id?: number;
  email?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UserRepository,
    private readonly hashService: HashService,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await this.hashService.hash(
        createUserDto.password,
      );

      const { password, ...rest } = await this.usersRepository.save({
        ...createUserDto,
        password: hashedPassword,
      });

      const { token } = await this.authService.login(rest);
      // Create DTO
      return { ...rest, token };
    } catch (e) {
      const errorCode = e?.code || '';
      switch (errorCode) {
        // todo change to enum
        case '23505':
          throw new HttpException('Email already exists', HttpStatus.CONFLICT);

        default:
          throw new InternalServerErrorException();
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne({ email, id }: FindOneParams, options?: FindOneOptions<User>) {
    return this.usersRepository.findOne({
      where: { email, id },
      ...options,
      select: ['email', 'id', 'picture', 'name'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
