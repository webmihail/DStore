import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from 'src/orders/entity/order.entity';
import { TelegramMessengerService } from './telegramMessenger.service';

@ApiTags('Telegram Messenger')
@Controller('telegram-messenger')
export class TelegramMessengerController {
  constructor(
    private readonly telegramMessengerService: TelegramMessengerService,
  ) {}

  @ApiOperation({ summary: 'Send order message' })
  @ApiResponse({ status: 200 })
  @Post('send')
  async sendOrderMessage(@Body() data: OrderEntity): Promise<void> {
    return await this.telegramMessengerService.sendOrderMessage(data);
  }
}
