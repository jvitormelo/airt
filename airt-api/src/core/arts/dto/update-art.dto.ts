import { PartialType } from '@nestjs/mapped-types';
import { CreateArtDto } from './create-art.dto';

export class UpdateImageDto extends PartialType(CreateArtDto) {}
