import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initTestE2E } from 'test/utils/init-e2e-test';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const { initializedApp, initializedToken } = await initTestE2E();
    app = initializedApp;
    token = initializedToken;
  }, 60000);

  //   afterEach(async () => {
  //     const repository: ArtRepository = app.get(getRepositoryToken(Art));

  //     await repository.clear();
  //   });

  afterAll(async () => {
    await app.close();
  });

  describe('/collections/me (GET)', () => {
    test('Find all collections for one user', async () => {
      const collectionName = 'test';

      await request(app.getHttpServer())
        .post('/collections')
        .set('Authorization', token)
        .send({
          name: collectionName,
        });

      const { body: collection } = await request(app.getHttpServer())
        .get('/collections/me')
        .set('Authorization', token);

      expect(collection).toHaveLength(1);
      expect(collection[0].name).toBe(collectionName);
    }, 60000);
  });
});
