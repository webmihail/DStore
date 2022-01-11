import { PartialType } from '@nestjs/swagger';
import { ProductInfoCreateDTO } from './productInfo.create.dto';

export class ProductInfoEditDTO extends PartialType(ProductInfoCreateDTO) {}
