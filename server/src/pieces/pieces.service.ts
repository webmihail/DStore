import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsInfoService } from 'src/productsInfo/productsInfo.service';
import { DeleteResult, Repository } from 'typeorm';
import { PieceCreateDTO } from './dtos/piece.create.dto';
import { PieceEditDTO } from './dtos/piece.edit.dto';
import { PieceEntity } from './entity/piece.entity';

@Injectable()
export class PiecesService {
  constructor(
    @InjectRepository(PieceEntity)
    private readonly piecesRepository: Repository<PieceEntity>,
    private readonly productsInfoService: ProductsInfoService,
  ) {}

  async getById(id: string): Promise<PieceEntity> {
    return await this.piecesRepository.findOne(id, {
      relations: ['productInfo', 'productInfo.product'],
    });
  }

  async create(data: PieceCreateDTO): Promise<PieceEntity> {
    const productInfo = await this.productsInfoService.getById(
      data.productInfoId,
    );

    const newPiece = await this.piecesRepository.create({
      count: data.count,
      productInfo,
      price: productInfo.product.price,
    });

    return await this.piecesRepository.save(newPiece);
  }

  async update(id: string, data: PieceEditDTO): Promise<PieceEntity | null> {
    const piece = await this.getById(id);
    piece.count = data.count;
    piece.price = piece.productInfo.product.price * data.count;

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
