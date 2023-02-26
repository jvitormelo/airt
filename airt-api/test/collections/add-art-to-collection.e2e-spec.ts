import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initTestE2E } from 'test/utils/init-e2e-test';

describe('Add Art to Collection', () => {
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
    test('A art is added to a collection', async () => {
      const { body: createdCollection } = await request(app.getHttpServer())
        .post('/collections')
        .set('Authorization', token)
        .send({
          name: 'test',
        });

      const createdTag = await request(app.getHttpServer())
        .post('/tags')
        .set('Authorization', token)
        .send({
          name: 'test',
        });

      const { body: createdArt } = await request(app.getHttpServer())
        .post('/arts')
        .set('Authorization', token)
        .send({
          name: 'test',
          tags: [createdTag.body.name],
          nsfw: false,
        });

      const { body: createdArt2 } = await request(app.getHttpServer())
        .post('/arts')
        .set('Authorization', token)
        .send({
          name: 'test',
          tags: [createdTag.body.name],
          nsfw: false,
        });

      await request(app.getHttpServer())
        .post(`/collections/${createdCollection.id}/arts`)
        .set('Authorization', token)
        .send({
          artId: createdArt.id,
        });

      const response = await request(app.getHttpServer())
        .post(`/collections/${createdCollection.id}/arts`)
        .set('Authorization', token)
        .send({
          artId: createdArt2.id,
        });

      expect(response.status).toBe(201);
    }, 60000);
  });
});
