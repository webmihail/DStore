import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import settings from 'settings';
import { OrderEntity } from 'src/orders/entity/order.entity';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramMessengerService {
  private sendMessage(message: string): void {
    const bot = new Telegraf(settings.telegram.botId);
    bot.telegram.sendMessage(settings.telegram.chatId, message);
  }

  sendOrderMessage(data: OrderEntity): void {
    const message = `Нове замовлення: \n - Замовлення №: ${
      data.code
    } \n - Замовник: ${data.user.firstName} ${
      data.user.lastName
    } \n - Телефон: ${data.user.phone} \n - Дата замовлення: ${moment(
      data.createdAt,
    ).format('DD.MM.YYYY')} \n - Час замовлення ${moment(data.createdAt)
      .add(5, 'hours')
      .format('LT')} \n - Замовлення: \n ${data.pieces.reduce(
      (prev, next, index) => {
        return `${
          prev +
          `${index + 1}) ${next.product.name} ${
            next.product.productsInfo[0].color.name
          } (Код: ${next.product.productsInfo[0].code}) - ${next.count} шт (${
            next.price
          } грн)`
        } \n`;
      },
      '',
    )} \n Всього одиниць: ${data.count} \n Сума замовлення: ${data.price} грн`;

    this.sendMessage(message);
  }
}
