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
import { ColorsService } from './colors.service';
import { Permissions } from '../permissions/constants';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { BanGuard } from 'src/bans/guards/ban.guard';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { ColorEntity } from './entity/color.entity';
import { ColorCreateDTO } from './dtos/color.create.dto';
import { DeleteResult } from 'typeorm';
import { ColorEditDTO } from './dtos/color.edit.dto';

@ApiTags('Colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsServices: ColorsService) {}

  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all colors' })
  @ApiResponse({ status: 200, type: [ColorEntity] })
  @Get()
  async getAllColors(): Promise<ColorEntity[]> {
    return await this.colorsServices.getAll();
  }

  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get color by id' })
  @ApiResponse({ status: 200, type: ColorEntity })
  @Get(':id')
  async getColor(@Param('id') id: string): Promise<ColorEntity> {
    return await this.colorsServices.getById(id);
  }

  @ApiOperation({ summary: 'Create color' })
  @ApiResponse({ status: 200, type: ColorEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createColor(@Body() data: ColorCreateDTO): Promise<ColorEntity> {
    return await this.colorsServices.create(data);
  }

  @ApiOperation({ summary: 'Update color' })
  @ApiResponse({ status: 200, type: ColorEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateSize(
    @Param('id') id: string,
    @Body() data: ColorEditDTO,
  ): Promise<ColorEntity> {
    return await this.colorsServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete color' })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSize(@Param('id') id: string): Promise<DeleteResult> {
    return await this.colorsServices.delete(id);
  }
}
