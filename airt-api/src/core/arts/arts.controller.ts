import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { IReqUser, ReqUser } from 'src/common/decorators/user.decorator';
import { FindAllArtsDto } from 'src/core/arts/dto/find-all-arts.dto';
import { FindLikedArtsUseCase } from 'src/core/arts/use-cases/find-liked-arts.case';
import { CreateArtDto } from './dto/create-art.dto';
import { CreateArtUseCase } from './use-cases/create-art.case';
import { FindAllArtsUseCase } from './use-cases/find-all-arts.case';
import { FindArtUseCase } from './use-cases/find-art.case';

@Controller('arts')
export class ArtsController {
  constructor(
    private readonly createArtUseCase: CreateArtUseCase,
    private readonly findAllArtsUseCase: FindAllArtsUseCase,
    private readonly findArtUseCase: FindArtUseCase,
    private readonly findLikedArtsUseCase: FindLikedArtsUseCase,
  ) {}

  @Post()
  create(@Body() createImageDto: CreateArtDto, @ReqUser() user: IReqUser) {
    return this.createArtUseCase.execute(createImageDto, user.id);
  }

  @Public()
  @Get()
  findAll(@Query() findArtsDto: FindAllArtsDto) {
    const { limit, page, sortBy, tags } = findArtsDto;
    return this.findAllArtsUseCase.execute(
      limit || 10,
      page || 1,
      sortBy,
      tags,
    );
  }

  @Get('/liked')
  findLiked(@ReqUser() user: IReqUser) {
    return this.findLikedArtsUseCase.execute(user.id);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findArtUseCase.execute(+id);
  }
}
