import { PartialType } from '@nestjs/swagger';
import { CategoryCreateDTO } from './category.create.dto';

export class CategoryEditDTO extends PartialType(CategoryCreateDTO) {}
