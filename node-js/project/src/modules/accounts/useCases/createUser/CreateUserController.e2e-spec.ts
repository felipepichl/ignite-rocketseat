import request from 'supertest';
import { app } from '@shared/infra/http/start/app';

describe("[E2E] = CreateUsers", () => {
  it("should be able to create a new user", async () => {
    const response = await request(app).post('/users').send({
      name: 'Test',
      email: 'test@test.com',
      password: 'hash123',
      driver_license: 'AB',
    });

    expect(response.status).toBe(201);
  });
})
