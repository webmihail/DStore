import { PartialType } from '@nestjs/swagger';
import { BrandCreateDTO } from './brend.create.dto';

export class BrandEditDTO extends PartialType(BrandCreateDTO) {}
