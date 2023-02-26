import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Order, ORDER } from 'src/common/constants/order.constant';
import { TagsField, TAGS_FIELD } from '../constants/tags-search-field.constant';

export class FindAllTagsDTO {
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit: number;

  @IsString()
  @IsIn(Object.values(ORDER))
  @IsOptional()
  order: Order;

  @IsString()
  @IsIn(Object.values(TAGS_FIELD))
  @IsOptional()
  field: TagsField;

  @IsNumber()
  @Min(1)
  @IsOptional()
  page: number;

  @IsString()
  @IsOptional()
  searchTerm?: string;
}
