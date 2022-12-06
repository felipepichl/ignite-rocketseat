import { hash } from "bcrypt";
import request from "supertest";

import { app } from "@shared/infra/http/start/app";
import { prisma } from "@shared/infra/prisma";

describe("[E2E] = Authenticate User", () => {
  beforeEach(async () => {
    const passwordHash = await hash("hash123", 8);

    await prisma.user.create({
      data: {
        name: "Test",
        email: "test@test.com",
        password: passwordHash,
        driver_license: "AB",
      },
    });
  });

  it("should de able to create a new authenticate", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "test@test.com",
      password: "hash123",
    });

    expect(responseToken.body).toHaveProperty("token");
  });
});
