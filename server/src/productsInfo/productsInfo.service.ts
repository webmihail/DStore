import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorsService } from 'src/colors/colors.service';
import { FileManagerService } from 'src/fileManager/fileManager.service';
import { ProductsService } from 'src/products/products.service';
import { SizesService } from 'src/sizes/sizes.service';
import { DeleteResult, Repository } from 'typeorm';
import { ProductInfoCreateDTO } from './dtos/productInfo.create.dto';
import { ProductInfoEditDTO } from './dtos/productInfo.edit.dto';
import { ProductInfoEntity } from './entity/productInfo.entity';

@Injectable()
export class ProductsInfoService {
  constructor(
    @InjectRepository(ProductInfoEntity)
    private readonly productInfoRepository: Repository<ProductInfoEntity>,
    private readonly sizesService: SizesService,
    private readonly colorsService: ColorsService,
    private readonly productsService: ProductsService,
    private readonly fileManagerService: FileManagerService,
  ) {}

  async getById(id: string): Promise<ProductInfoEntity> {
    return await this.productInfoRepository.findOne(id, {
      relations: ['size', 'color', 'product', 'images'],
    });
  }

  async create(
    productId: string,
    data: ProductInfoCreateDTO,
  ): Promise<ProductInfoEntity> {
    const product = await this.productsService.getById(productId);
    const newProductInfo = await this.productInfoRepository.create(data);
    newProductInfo.product = product;
    return await this.productInfoRepository.save(newProductInfo);
  }

  async update(
    id: string,
    data: ProductInfoEditDTO,
  ): Promise<ProductInfoEntity> {
    const productInfo = await this.getById(id);
    const editProductInfo = Object.assign(productInfo, data);
    return await this.productInfoRepository.save(editProductInfo);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.productInfoRepository.delete(id);
  }

  async changeInStockStatus(id: string): Promise<ProductInfoEntity> {
    const productInfo = await this.getById(id);
    productInfo.inStock = !productInfo.inStock;
    return await this.productInfoRepository.save(productInfo);
  }

  async addSize(
    productInfoId: string,
    sizeId: string,
  ): Promise<ProductInfoEntity> {
    const productInfo = await this.getById(productInfoId);
    const size = await this.sizesService.getById(sizeId);
    productInfo.size = size;
    const editProductInfo = await this.productInfoRepository.save(productInfo);

    return editProductInfo;
  }

  async deleteSize(productInfoId: string): Promise<ProductInfoEntity> {
    const productInfo = await this.getById(productInfoId);
    productInfo.size = null;
    const editProductInfo = await this.productInfoRepository.save(productInfo);

    return editProductInfo;
  }

  async addColor(
    productInfoId: string,
    colorId: string,
  ): Promise<ProductInfoEntity> {
    const productInfo = await this.getById(productInfoId);
    const color = await this.colorsService.getById(colorId);
    productInfo.color = color;
    const editProductInfo = await this.productInfoRepository.save(productInfo);

    return editProductInfo;
  }

  async deleteColor(productInfoId: string): Promise<ProductInfoEntity> {
    const productInfo = await this.getById(productInfoId);
    productInfo.color = null;
    const editProductInfo = await this.productInfoRepository.save(productInfo);

    return editProductInfo;
  }

  async addImage(productInfoId: string, imageBuffer: Buffer, filename: string) {
    const image = await this.fileManagerService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const productInfo = await this.getById(productInfoId);
    productInfo.images.push(image);

    return await this.productInfoRepository.save(productInfo);
  }

  async deleteImage(productInfoId: string, imageId: string) {
    const productInfo = await this.getById(productInfoId);
    const editProductInfo = productInfo.images.filter(
      (image) => image.id !== imageId,
    );

    productInfo.images = editProductInfo;

    await this.fileManagerService.deletePublicFile(imageId);
    return await this.productInfoRepository.save(productInfo);
  }
}
