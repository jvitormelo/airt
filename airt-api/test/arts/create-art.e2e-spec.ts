import { INestApplication } from '@nestjs/common';
import { placeholderImage } from 'src/core/arts/constants/placeholder.constant';
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

  describe('/arts (POST)', () => {
    test('A new art is created', async () => {
      const createdTag = await request(app.getHttpServer())
        .post('/tags')
        .set('Authorization', token)
        .send({
          name: 'test',
        });

      const response = await request(app.getHttpServer())
        .post('/arts')
        .set('Authorization', token)
        .send({
          name: 'test',
          tags: [createdTag.body.name],
          nsfw: false,
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(Number),
        fields: {},
        key: '',
        url: placeholderImage,
      });
    }, 60000);
  });
});
