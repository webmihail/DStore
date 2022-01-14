import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { DeleteResult, Repository } from 'typeorm';
import { PieceCreateDTO } from './dtos/piece.create.dto';
import { PieceEditDTO } from './dtos/piece.edit.dto';
import { PieceEntity } from './entity/piece.entity';

@Injectable()
export class PiecesService {
  constructor(
    @InjectRepository(PieceEntity)
    private readonly piecesRepository: Repository<PieceEntity>,
    private readonly productsServices: ProductsService,
  ) {}

  async getById(id: string): Promise<PieceEntity> {
    return await this.piecesRepository.findOne(id, {
      relations: ['product', 'product.productsInfo'],
    });
  }

  async create(data: PieceCreateDTO): Promise<PieceEntity> {
    const product = await this.productsServices.getById(data.productId);

    const newPiece = await this.piecesRepository.create({
      count: data.count,
      product,
      price: product.price,
    });

    return await this.piecesRepository.save(newPiece);
  }

  async update(id: string, data: PieceEditDTO): Promise<PieceEntity | null> {
    const piece = await this.getById(id);
    piece.count = data.count;
    piece.price = piece.product.price * data.count;

    if (piece.count <= 0) {
      await this.delete(piece.id);
      return null;
    }

    return await this.piecesRepository.save(piece);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.piecesRepository.delete(id);
  }
}
