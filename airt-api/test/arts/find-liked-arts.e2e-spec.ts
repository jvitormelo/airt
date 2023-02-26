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

  describe('/arts/liked (GET)', () => {
    test('Return a list of arts', async () => {
      const createdTag = await request(app.getHttpServer())
        .post('/tags')
        .set('Authorization', token)
        .send({
          name: 'test',
        });

      await request(app.getHttpServer())
        .post('/arts')
        .set('Authorization', token)
        .send({
          name: 'test',
          tags: [createdTag.body.name],
          nsfw: false,
        });

      const { body: arts } = await request(app.getHttpServer())
        .get('/arts')
        .set('Authorization', token);

      const artId = arts.data[0].id || 1;

      await request(app.getHttpServer())
        .post(`/likes/${artId}/like`)
        .set('Authorization', token)
        .send({
          liked: true,
        });

      const response = await request(app.getHttpServer())
        .get('/arts/liked')
        .set('Authorization', token);

      expect(response.status).toBe(200);

      expect(response.body).toBeInstanceOf(Array);

      expect(response.body).toHaveLength(1);

      const likedArt = response.body[0];

      expect(likedArt.id).toBe(artId);
    }, 60000);
  });
});
