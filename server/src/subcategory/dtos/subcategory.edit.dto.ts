import { PartialType } from '@nestjs/swagger';
import { SubcategoryCreateDTO } from './subcategory.create.dto';

export class SubcategoryEditDTO extends PartialType(SubcategoryCreateDTO) {}
