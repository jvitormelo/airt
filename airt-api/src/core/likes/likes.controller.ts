import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IReqUser, ReqUser } from 'src/common/decorators/user.decorator';
import { LikeImageDto } from './dto/like-art.dto';
import { IsArtLikedUseCase } from './use-cases/is-art-liked.case';
import { LikeArtUseCase } from './use-cases/like-art.case';

@Controller('likes')
export class LikesController {
  constructor(
    private readonly likeArtUseCase: LikeArtUseCase,
    private readonly isArtLikedUseCase: IsArtLikedUseCase,
  ) {}

  @Post(':artId/like')
  like(
    @Param('artId') id: string,
    @ReqUser() user: IReqUser,
    @Body() likeImageDto: LikeImageDto,
  ) {
    return this.likeArtUseCase.execute(+id, user.id, likeImageDto.liked);
  }

  @Get(':artId/liked')
  isLiked(@Param('artId') id: string, @ReqUser() user: IReqUser) {
    return this.isArtLikedUseCase.execute(+id, user.id);
  }
}
