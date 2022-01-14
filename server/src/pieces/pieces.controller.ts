import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PiecesService } from './pieces.service';
import { PieceEntity } from './entity/piece.entity';
import { PieceCreateDTO } from './dtos/piece.create.dto';
import { PieceEditDTO } from './dtos/piece.edit.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Pieces')
@Controller('pieces')
export class PiecesController {
  constructor(private readonly piecesServices: PiecesService) {}

  @ApiOperation({ summary: 'Create piece' })
  @ApiResponse({ status: 200, type: PieceEntity })
  @Post()
  async createPiece(@Body() data: PieceCreateDTO): Promise<PieceEntity> {
    return await this.piecesServices.create(data);
  }

  @ApiOperation({ summary: 'Update piece' })
  @ApiResponse({ status: 200, type: PieceEntity })
  @Put(':id')
  async updatePiece(
    @Param('id') id: string,
    @Body() data: PieceEditDTO,
  ): Promise<PieceEntity> {
    return await this.piecesServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete piece' })
  @Delete(':id')
  async deletePiece(@Param('id') id: string): Promise<DeleteResult> {
    return await this.piecesServices.delete(id);
  }
}
