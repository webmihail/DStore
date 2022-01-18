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
import { PermissionTypes } from 'src/permissions/constants';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
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

  @ApiOperation({ summary: 'Get all colors' })
  @ApiResponse({ status: 200, type: [ColorEntity] })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Get()
  async getAllColors(): Promise<ColorEntity[]> {
    return await this.colorsServices.getAll();
  }

  @ApiOperation({ summary: 'Get color by id' })
  @ApiResponse({ status: 200, type: ColorEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Get(':id')
  async getColor(@Param('id') id: string): Promise<ColorEntity> {
    return await this.colorsServices.getById(id);
  }

  @ApiOperation({ summary: 'Create color' })
  @ApiResponse({ status: 200, type: ColorEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Post()
  async createColor(@Body() data: ColorCreateDTO): Promise<ColorEntity> {
    return await this.colorsServices.create(data);
  }

  @ApiOperation({ summary: 'Update color' })
  @ApiResponse({ status: 200, type: ColorEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Put(':id')
  async updateSize(
    @Param('id') id: string,
    @Body() data: ColorEditDTO,
  ): Promise<ColorEntity> {
    return await this.colorsServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete color' })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Delete(':id')
  async deleteSize(@Param('id') id: string): Promise<DeleteResult> {
    return await this.colorsServices.delete(id);
  }
}
