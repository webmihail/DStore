import { PartialType } from '@nestjs/swagger';
import { ProductTypeCreateDTO } from './productType.create.dto';

export class ProductTypeEditDTO extends PartialType(ProductTypeCreateDTO) {}
