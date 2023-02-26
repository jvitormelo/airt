import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initTestE2E } from 'test/utils/init-e2e-test';

describe('Create Collection', () => {
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

  describe('/collections (POST)', () => {
    test('A new collection is created', async () => {
      const response = await request(app.getHttpServer())
        .post('/collections')
        .set('Authorization', token)
        .send({
          name: 'test',
        });

      expect(response.status).toBe(201);

      expect(response.body).toEqual({
        id: expect.any(Number),
        name: 'test',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        deletedAt: null,
      });
    }, 60000);
  });
});
