import { Module } from '@nestjs/common';
import { TelegramMessengerController } from './telegramMessenger.controller';
import { TelegramMessengerService } from './telegramMessenger.service';

@Module({
  controllers: [TelegramMessengerController],
  providers: [TelegramMessengerService],
  exports: [TelegramMessengerService],
})
export class TelegramMessengerModule {}
