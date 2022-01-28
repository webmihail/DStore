import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileManagerService } from './fileManager.service';
import * as Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import PublicFileEntity from './entity/publicFile.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forFeature([PublicFileEntity]),
  ],
  providers: [FileManagerService],
  exports: [FileManagerService],
})
export class FileManagerModule {}
