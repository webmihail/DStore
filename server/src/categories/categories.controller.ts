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
import { Permissions } from 'src/permissions/constants';
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { ProductCreateDTO } from 'src/products/dtos/product.create.dto';
import { DeleteResult } from 'typeorm';
import { CategoriesService } from './categories.service';
import { CategoryCreateDTO } from './dtos/category.create.dto';
import { CategoryDTO } from './dtos/category.dto';
import { CategoryEditDTO } from './dtos/category.edit.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryServices: CategoriesService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [CategoryDTO] })
  @Get()
  async getAllCategories(): Promise<CategoryDTO[]> {
    return await this.categoryServices.getAll();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, type: CategoryDTO })
  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<CategoryDTO> {
    return await this.categoryServices.getById(id);
  }

  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 200, type: CategoryDTO })
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

  @ApiOperation({ summary: 'Add subcategory to category' })
  @ApiResponse({ status: 200, type: CategoryDTO })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':categoryId/add-subcategory')
  async addSubcategoryToCategory(
    @Param('categoryId') categoryId: string,
    @Body() data: CategoryCreateDTO,
  ): Promise<CategoryDTO> {
    return await this.categoryServices.createSubcategory(categoryId, data);
  }

  @ApiOperation({ summary: 'Create and add product to category' })
  @ApiResponse({ status: 200, type: CategoryDTO })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':categoryId/create-product-to-category')
  async createProductAndAddToCategory(
    @Param('categoryId') categoryId: string,
    @Body() data: ProductCreateDTO,
  ): Promise<CategoryDTO> {
    return await this.categoryServices.createProductToCategory(
      categoryId,
      data,
    );
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, type: CategoryDTO })
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

  @ApiOperation({ summary: 'Add product to category' })
  @ApiResponse({ status: 200, type: CategoryDTO })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':categoryId/add-product/:productId')
  async addProductToCategory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ): Promise<CategoryDTO> {
    return await this.categoryServices.addProduct(categoryId, productId);
  }

  @ApiOperation({ summary: 'Delete product from category' })
  @ApiResponse({ status: 200, type: CategoryDTO })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionCategoryProductManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':categoryId/delete-product/:productId')
  async deleteProductFromCategory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ): Promise<CategoryDTO> {
    return await this.categoryServices.deleteProduct(categoryId, productId);
  }
}
