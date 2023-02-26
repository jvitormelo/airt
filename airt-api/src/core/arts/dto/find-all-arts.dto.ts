import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ArtsSort } from 'src/core/arts/constants/sort';

export class FindAllArtsDto {
  @IsNumber()
  @IsOptional()
  limit: number;

  @IsNumber()
  @IsOptional()
  page: number;

  @IsOptional()
  tags: string[];

  @IsOptional()
  @IsEnum(ArtsSort)
  sortBy: ArtsSort;
}
