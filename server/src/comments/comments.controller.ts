import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { BanGuard } from 'src/bans/guards/ban.guard';
import { DeleteResult } from 'typeorm';
import { CommentsService } from './comments.service';
import { CommentCreateDTO } from './dtos/comment.create.dto';
import { CommentEditDTO } from './dtos/comment.edit.dto';
import { CommentEntity } from './entity/comment.entity';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard, BanGuard)
  @ApiOperation({ summary: 'Get all comments by product id' })
  @ApiResponse({ status: 200, type: [CommentEntity] })
  @Get('all-comments-by/:productId')
  async getAllCommentsByProduct(
    @Param('productId') productId: string,
  ): Promise<CommentEntity[]> {
    return await this.commentsService.getAllByProductId(productId);
  }

  @UseGuards(JwtAuthGuard, BanGuard)
  @ApiOperation({ summary: 'Get comment by id' })
  @ApiResponse({ status: 200, type: CommentEntity })
  @Get(':id')
  async getComment(@Param('id') id: string): Promise<CommentEntity> {
    return await this.commentsService.getById(id);
  }

  @ApiOperation({ summary: 'Create and add comment to product' })
  @ApiResponse({ status: 200, type: CommentEntity })
  @UseGuards(JwtAuthGuard, BanGuard)
  @Post('by-user/:userId/create-comment-to-product/:productId')
  async createCommentForProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() data: CommentCreateDTO,
  ): Promise<CommentEntity> {
    return await this.commentsService.create(userId, productId, data);
  }

  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({ status: 200, type: CommentEntity })
  @UseGuards(JwtAuthGuard, BanGuard)
  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() data: CommentEditDTO,
  ): Promise<CommentEntity> {
    return await this.commentsService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @UseGuards(JwtAuthGuard, BanGuard)
  @Delete(':id')
  async deleteComment(@Param('id') id: string): Promise<DeleteResult> {
    return await this.commentsService.delete(id);
  }
}
