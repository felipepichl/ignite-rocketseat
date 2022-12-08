import { hash } from "bcrypt";
import request from "supertest";

import { app } from "@shared/infra/http/start/app";
import { prisma } from "@shared/infra/prisma";

describe("List Category Controller", () => {
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

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "hash123",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Description category supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
  });
});
