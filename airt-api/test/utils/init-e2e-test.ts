import { Test, TestingModule } from '@nestjs/testing';
import { BucketService } from 'src/common/services/bucket.service';
import { placeholderImage } from 'src/core/arts/constants/placeholder.constant';
import { createTestUser } from 'test/utils/create-user';
import { AppModule } from '../../src/app.module';

export async function initTestE2E() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(BucketService)
    .useValue({
      createPresignedLink: () => ({
        url: placeholderImage,
        key: '',
        fields: {},
      }),
    })
    .compile();

  const app = moduleFixture.createNestApplication();

  await app.init();

  const token = await createTestUser(app);

  return { initializedApp: app, initializedToken: token };
}
