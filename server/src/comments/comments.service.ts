import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { DeleteResult, Repository } from 'typeorm';
import { CommentCreateDTO } from './dtos/comment.create.dto';
import { CommentEditDTO } from './dtos/comment.edit.dto';
import { CommentEntity } from './entity/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly usersServices: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async getAllByProductId(productId: string): Promise<CommentEntity[]> {
    return await this.commentRepository.find({
      where: {
        product: {
          id: productId,
        },
      },
    });
  }

  async getById(id: string): Promise<CommentEntity> {
    return await this.commentRepository.findOne(id);
  }

  async create(
    userId: string,
    productId: string,
    data: CommentCreateDTO,
  ): Promise<CommentEntity> {
    const user = await this.usersServices.getById(userId);
    const product = await this.productsService.getById(productId);
    const newComment = await this.commentRepository.create({
      ...data,
      name: `${user.firstName} ${user.lastName}`,
    });
    newComment.user = user;
    newComment.product = product;
    return await this.commentRepository.save(newComment);
  }

  async update(id: string, data: CommentEditDTO): Promise<CommentEntity> {
    const comment = await this.getById(id);
    const editComment = Object.assign(comment, data);
    return await this.commentRepository.save(editComment);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.commentRepository.delete(id);
  }
}
