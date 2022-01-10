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
import PermissionGuard from 'src/permissions/guards/permission.guard';
import { Permissions } from 'src/permissions/constants';
import { DeleteResult } from 'typeorm';
import { BansService } from './bans.service';
import { BanCreateDTO } from './dtos/ban.create.dto';
import { BanEditDTO } from './dtos/ban.edit.dto';
import { BanEntity } from './entity/ban.entity';
import { BanGuard } from './guards/ban.guard';

@ApiTags('Bans')
@Controller('bans')
export class BansController {
  constructor(private readonly bansServices: BansService) {}

  @ApiOperation({ summary: 'Get all bans' })
  @ApiResponse({ status: 200, type: [BanEntity] })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionBanManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllBans(): Promise<BanEntity[]> {
    return await this.bansServices.getAll();
  }

  @ApiOperation({ summary: 'Get ban by id' })
  @ApiResponse({ status: 200, type: BanEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionBanManagementRead,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBan(@Param('id') id: string): Promise<BanEntity> {
    return await this.bansServices.getById(id);
  }

  @ApiOperation({ summary: 'Create new ban' })
  @ApiResponse({ status: 200, type: BanEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionBanManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createBan(@Body() data: BanCreateDTO): Promise<BanEntity> {
    return await this.bansServices.create(data);
  }

  @ApiOperation({ summary: 'Update ban' })
  @ApiResponse({ status: 200, type: BanEntity })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionBanManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBan(
    @Param('id') id: string,
    @Body() data: BanEditDTO,
  ): Promise<BanEntity> {
    return await this.bansServices.update(id, data);
  }

  @ApiOperation({ summary: 'Delete ban' })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionBanManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBan(@Param('id') id: string): Promise<DeleteResult> {
    return await this.bansServices.delete(id);
  }

  @ApiOperation({ summary: 'Change ban status' })
  @UseGuards(
    PermissionGuard([
      Permissions.SubscriptionFullManagement,
      Permissions.SubscriptionBanManagementWrite,
    ]),
  )
  @UseGuards(BanGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id/change-ban-status')
  async changeBanStatus(@Param('id') id: string): Promise<BanEntity> {
    return await this.bansServices.changeBanStatus(id);
  }
}
