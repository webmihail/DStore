import { PartialType } from '@nestjs/swagger';
import { SaleCreateDTO } from './sale.create.dto';

export class SaleEditDTO extends PartialType(SaleCreateDTO) {}
