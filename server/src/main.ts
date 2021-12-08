import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('/api/v1');

    //Helmet can help protect your app from some well-known (https://github.com/helmetjs/helmet#how-it-works)
    app.use(helmet());

    await app.listen(PORT, () => {
      console.log(`server started on port: ${PORT}`);
    });
  } catch (e) {}
}
bootstrap();
