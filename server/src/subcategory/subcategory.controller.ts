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
import { Permissions } from 'src/permissions/constants';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { DeleteResult } from 'typeorm';
import { SubcategoryCreateDTO } from './dtos/subcategory.create.dto';
import { SubcategoryDTO } from './dtos/subcategory.dto';
import { SubcategoryEditDTO } from './dtos/subcategory.edit.dto';
import { Subcategory } from './entity/subcategory.entity';
import { SubcategoryService } from './subcategory.service';

@ApiTags('Subcategories')
@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryServices: SubcategoryService) {}

  @ApiOperation({ summary: 'Get all subcategories' })
  @ApiResponse({ status: 200, type: [Subcategory] })
  @Get()
  async getAllSubcategories(): Promise<SubcategoryDTO[]> {
    return await this.subcategoryServices.getAll();
  }

  @ApiOperation({ summary: 'Get subcategory by id' })
  @ApiResponse({ status: 200, type: Subcategory })
  @Get(':id')
  async getSubcategory(@Param('id') id: string): Promise<SubcategoryDTO> {
    return await this.subcategoryServices.getById(id);
  }

  @ApiOperation({ summary: 'Create new subcategory' })
  @ApiResponse({ status: 200, type: Subcategory })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createSubcategory(
    @Body() data: SubcategoryCreateDTO,
  ): Promise<SubcategoryDTO> {
    return await this.subcategoryServices.create(data);
  }

  @ApiOperation({ summary: 'Update subcategory' })
  @ApiResponse({ status: 200, type: Subcategory })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateSubcategory(
    @Param('id') id: string,
    @Body() data: SubcategoryEditDTO,
  ): Promise<SubcategoryDTO> {
    return await this.subcategoryServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete subcategory' })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSubcategory(@Param('id') id: string): Promise<DeleteResult> {
    return await this.subcategoryServices.delete(id);
  }
}
