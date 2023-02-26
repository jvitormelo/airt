import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IReqUser, ReqUser } from 'src/common/decorators/user.decorator';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  create(
    @Body() createCollectionDto: CreateCollectionDto,
    @ReqUser() user: IReqUser,
  ) {
    return this.collectionsService.create(createCollectionDto, user.id);
  }

  @Get('/me')
  findAllUserCollections(@ReqUser() user: IReqUser) {
    return this.collectionsService.findAllUserCollections(user.id);
  }

  @Get('/:id/arts')
  findAllCollectionArts(@Param('id') id: string) {
    return this.collectionsService.findAllCollectionArts(+id);
  }

  @Post('/:id/arts')
  addArtToCollection(@Param('id') id: number, @Body('artId') artId: number) {
    return this.collectionsService.addArtToCollection(id, artId);
  }

  @Get()
  findAll() {
    return this.collectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(+id);
  }
}
