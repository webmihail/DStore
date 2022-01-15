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
import { SizesService } from './sizes.service';
import { BanGuard } from 'src/bans/guards/ban.guard';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { SizeEntity } from './entity/size.entity';
import { SizeCreateDTO } from './dtos/size.create.dto';
import { SizeEditDTO } from './dtos/size.edit.dto';
import { DeleteResult } from 'typeorm';
import { PermissionTypes } from 'src/permissions/constants';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import PermissionGuard from 'src/permissions/guards/permission.guard';

@ApiTags('Sizes')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesServices: SizesService) {}

  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @ApiOperation({ summary: 'Get all sizes' })
  @ApiResponse({ status: 200, type: [SizeEntity] })
  @Get()
  async getAllSizes(): Promise<SizeEntity[]> {
    return await this.sizesServices.getAll();
  }

  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementRead,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @ApiOperation({ summary: 'Get size by id' })
  @ApiResponse({ status: 200, type: SizeEntity })
  @Get(':id')
  async getSize(@Param('id') id: string): Promise<SizeEntity> {
    return await this.sizesServices.getById(id);
  }

  @ApiOperation({ summary: 'Create size' })
  @ApiResponse({ status: 200, type: SizeEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Post()
  async createSize(@Body() data: SizeCreateDTO): Promise<SizeEntity> {
    return await this.sizesServices.create(data);
  }

  @ApiOperation({ summary: 'Update size' })
  @ApiResponse({ status: 200, type: SizeEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Put(':id')
  async updateSize(
    @Param('id') id: string,
    @Body() data: SizeEditDTO,
  ): Promise<SizeEntity> {
    return await this.sizesServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete size' })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Delete(':id')
  async deleteSize(@Param('id') id: string): Promise<DeleteResult> {
    return await this.sizesServices.delete(id);
  }
}
