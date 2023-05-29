import { hash } from "bcrypt";
import request from "supertest";

import { app } from "@shared/infra/http/start/app";
import { prisma } from "@shared/infra/prisma";

describe("Create Category Controller", () => {
  beforeAll(async () => {
    const passwordHash = await hash("hash123", 8);

    await prisma.user.create({
      data: {
        name: "Test",
        email: "admin@rentx.com.br",
        password: passwordHash,
        driver_license: "AB",
        is_admin: true,
      },
    });
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "hash123",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Description category supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });

  it("should not be able to create a new category with same name for another", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "hash123",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Description category supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
