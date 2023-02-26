import { IsBoolean } from 'class-validator';

export class LikeImageDto {
  @IsBoolean()
  liked: boolean;
}
