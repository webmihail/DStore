import { PartialType } from '@nestjs/swagger';
import { ColorCreateDTO } from './color.create.dto';

export class ColorEditDTO extends PartialType(ColorCreateDTO) {}
