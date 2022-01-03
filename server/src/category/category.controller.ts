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
import { CategoryService } from './category.service';
import { CategoryCreateDTO } from './dtos/category.create.dto';
import { CategoryDTO } from './dtos/category.dto';
import { CategoryEditDTO } from './dtos/category.edit.dto';
import { Category } from './entity/category.entity';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryServices: CategoryService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  async getAllCategories(): Promise<CategoryDTO[]> {
    return await this.categoryServices.getAll();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, type: Category })
  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<CategoryDTO> {
    return await this.categoryServices.getById(id);
  }

  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 200, type: Category })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Body() data: CategoryCreateDTO): Promise<CategoryDTO> {
    return await this.categoryServices.create(data);
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, type: Category })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() data: CategoryEditDTO,
  ): Promise<CategoryDTO> {
    return await this.categoryServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete category' })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<DeleteResult> {
    return await this.categoryServices.delete(id);
  }
}
