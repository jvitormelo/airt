import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  tags: string[];

  @IsBoolean()
  nsfw: boolean;
}
