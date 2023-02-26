import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { userPicturePlaceholder } from 'src/core/users/constants';
import * as request from 'supertest';

describe('Create User', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  //   afterEach(async () => {
  //     const repository: ArtRepository = app.get(getRepositoryToken(Art));

  //     await repository.clear();
  //   });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (POST)', () => {
    test('A new user is created', async () => {
      const email = `${Date.now()}@test.com`;

      const response = await request(app.getHttpServer()).post('/users').send({
        email,
        name: 'test',
        password: '123456',
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(Number),
        email,
        name: 'test',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        picture: userPicturePlaceholder,
        token: expect.any(String),
      });
    });
  });
});
