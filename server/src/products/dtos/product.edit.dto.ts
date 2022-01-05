import { PartialType } from '@nestjs/swagger';
import { ProductCreateDTO } from './product.create.dto';

export class ProductEditDTO extends PartialType(ProductCreateDTO) {}
