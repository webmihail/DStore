import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import PublicFileEntity from './entity/publicFile.entity';
import { v4 as uuid } from 'uuid';
import settings from 'settings';

@Injectable()
export class FileManagerService {
  constructor(
    @InjectRepository(PublicFileEntity)
    private publicFilesRepository: Repository<PublicFileEntity>,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        ACL: settings.awsStoreS3.acl,
        Bucket: settings.awsStoreS3.publicBucketName,
        Body: dataBuffer,
        Key: `${settings.awsStoreS3.folder}/${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }

  async deletePublicFile(id: string) {
    const file = await this.publicFilesRepository.findOne(id);
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: settings.awsStoreS3.publicBucketName,
        Key: file.key,
      })
      .promise();
    await this.publicFilesRepository.delete(id);
  }
}
