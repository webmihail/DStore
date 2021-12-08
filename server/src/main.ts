import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('/api/v1');

    //Helmet can help protect your app from some well-known (https://github.com/helmetjs/helmet#how-it-works)
    app.use(helmet());

    const swaggerConfig = new DocumentBuilder()
      .setTitle('DeStore API')
      .setDescription('API docs')
      .setVersion('1.0.0')
      .addTag('DeStore')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api/docs', app, swaggerDocument);

    //To protect your applications from brute-force attacks
    app.use(
      new rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
      }),
    );

    app.useGlobalPipes(
      new ValidationPipe({
        //Strip away all none-object existing properties
        whitelist: true,
        //Transform input objects to their corresponding DTO objects
        transform: true,
      }),
    );

    await app.listen(PORT, () => {
      console.log(`server started on port: ${PORT}`);
    });
  } catch (e) {}
}
bootstrap();
