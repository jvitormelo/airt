import { GetObjectAttributesCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/common/config/configuration';

@Injectable()
export class BucketService {
  public bucketName: string;
  private s3: S3Client;

  constructor(private configService: ConfigService<EnvVariables>) {
    const { accessKeyId, bucket, secretAccessKey } =
      this.configService.get<EnvVariables['aws']>('aws');

    this.s3 = new S3Client({
      region: bucket.region,
      credentials: {
        secretAccessKey,
        accessKeyId,
      },
    });

    this.bucketName = bucket.name;
  }

  private formatKey(key: string) {
    return key.includes('.png') ? key : key + '.png';
  }

  async createPresignedLink(key: string) {
    const Bucket = this.bucketName;

    const Key = this.formatKey(key);

    const response = await createPresignedPost(this.s3, {
      Bucket,
      Key,
      Fields: {
        acl: 'public-read',
        'Content-type': 'image/png',
      },
    });

    return { ...response, key: Key };
  }

  async getObject(key: string) {
    const Bucket = this.bucketName;

    const Key = key;

    const response = await this.s3.send(
      new GetObjectAttributesCommand({
        Bucket,
        Key,
        ObjectAttributes: [
          'ETag',
          'Checksum',
          'ObjectParts',
          'StorageClass',
          'ObjectSize',
        ],
      }),
    );

    return response;
  }
}
