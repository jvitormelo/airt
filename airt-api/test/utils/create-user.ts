import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export const createTestUser = async (
  app: INestApplication,
): Promise<string> => {
  const response = await request(app.getHttpServer())
    .post('/users')
    .send({
      email: `${Date.now()}@test.com`,
      password: '123456',
      name: 'Test User',
    });

  const token = response.body.token;

  return `Bearer ${token}`;
};
