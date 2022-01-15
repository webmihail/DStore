import { PartialType } from '@nestjs/swagger';
import { RatingCreateDTO } from './rating.create.dto';

export class RatingEditDTO extends PartialType(RatingCreateDTO) {}
