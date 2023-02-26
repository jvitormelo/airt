import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateTagBulkUseCase } from 'src/core/tags/use-cases/create-tag-bulk.case';
import { CreateTagUseCase } from 'src/core/tags/use-cases/create-tag.case';
import { FindAllTagsUseCase } from 'src/core/tags/use-cases/find-all-tags.case';
import { CreateTagDto } from './dto/create-tag.dto';
import { FindAllTagsDTO } from './dto/find-all-tags.dto';

@Controller('tags')
export class TagsController {
  constructor(
    private readonly createTagUseCase: CreateTagUseCase,
    private readonly findAllTagsUseCase: FindAllTagsUseCase,
    private readonly createTagBulkUseCase: CreateTagBulkUseCase,
  ) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.createTagUseCase.execute(createTagDto);
  }

  @Public()
  @Get()
  findAll(@Query() findAllTagsDTO: FindAllTagsDTO) {
    return this.findAllTagsUseCase.execute(findAllTagsDTO);
  }

  @Post('bulk')
  createBulk(@Body('tags') tags: string[]) {
    return this.createTagBulkUseCase.execute(tags);
  }
}
