import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt.auth.guard';
import { BanGuard } from 'src/bans/guards/ban.guard';
import { PermissionTypes } from 'src/permissions/constants';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { DeleteResult } from 'typeorm';
import { CategoriesService } from './categories.service';
import { CategoryCreateDTO } from './dtos/category.create.dto';
import { CategoryEditDTO } from './dtos/category.edit.dto';
import { CategoryEntity } from './entity/category.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryServices: CategoriesService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [CategoryEntity] })
  @Get()
  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryServices.getAll();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, type: CategoryEntity })
  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<CategoryEntity> {
    return await this.categoryServices.getById(id);
  }

  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 200, type: CategoryEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Post()
  async createCategory(
    @Body() data: CategoryCreateDTO,
  ): Promise<CategoryEntity> {
    return await this.categoryServices.create(data);
  }

  @ApiOperation({ summary: 'Add subcategory to category' })
  @ApiResponse({ status: 200, type: CategoryEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Patch(':categoryId/add-subcategory')
  async addSubcategoryToCategory(
    @Param('categoryId') categoryId: string,
    @Body() data: CategoryCreateDTO,
  ): Promise<CategoryEntity> {
    return await this.categoryServices.createSubcategory(categoryId, data);
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, type: CategoryEntity })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() data: CategoryEditDTO,
  ): Promise<CategoryEntity> {
    return await this.categoryServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete category' })
  @Permissions(
    PermissionTypes.SubscriptionFullManagement,
    PermissionTypes.SubscriptionCategoryProductManagementWrite,
  )
  @UseGuards(JwtAuthGuard, BanGuard, PermissionGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<DeleteResult> {
    return await this.categoryServices.delete(id);
  }
}
