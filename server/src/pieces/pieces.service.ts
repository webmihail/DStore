import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class PiecesService {
  constructor(private readonly productsServices: ProductsService) {}
}
