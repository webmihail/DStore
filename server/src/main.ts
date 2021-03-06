import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import settings from 'settings';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  try {
    const PORT = settings.server.port || 5000;
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors();
    app.setGlobalPrefix(settings.server.apiPrefix);
    app.use(cookieParser());

    //Helmet can help protect your app from some well-known (https://github.com/helmetjs/helmet#how-it-works)
    app.use(helmet());

    config.update({
      accessKeyId: configService.get(settings.awsStoreS3.accessKeyId),
      secretAccessKey: configService.get(settings.awsStoreS3.secretAccessKey),
      region: configService.get(settings.awsStoreS3.region),
    });

    if (settings.server.isSwaggerOn) {
      const swaggerConfig = new DocumentBuilder()
        .setTitle('DeStore API')
        .setDescription('API docs')
        .setVersion('1.0.0')
        .addTag('DeStore')
        .build();

      const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
      SwaggerModule.setup(settings.server.swaggerPrefix, app, swaggerDocument);
    }

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
