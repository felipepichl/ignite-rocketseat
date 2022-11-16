import { hash } from "bcrypt";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { PrismaClient, Prisma } from "@prisma/client";
import { app } from "@shared/infra/http/start/app";
// import { AppDataSource } from "@shared/infra/typeorm/";

describe("Create Category Controller", () => {
  beforeAll(async () => {
    // await AppDataSource.initialize();
    // await AppDataSource.runMigrations();

    const prisma = new PrismaClient();

    const id = uuid();
    const password = await hash("admin", 8);

    // await prisma.$executeRaw(
    //   Prisma.sql(
    //     `INSERT INTO USERS(id, name, email, password, driver_license, isAdmin, created_at) values ('${id}', 'admin', 'admin@rentx.com.br', '${password}','XX', true,'${new Date().getTime()}')`
    //   )
    // );

    // AppDataSource.query(
    //   `INSERT INTO USERS(
    //     id,
    //     name,
    //     email,
    //     password,
    //     driver_license,
    //     isAdmin,
    //     created_at
    //   )
    //   values(
    //     '${id}',
    //     'admin',
    //     'admin@rentx.com.br',
    //     '${password}',
    //     'XX',
    //     true,
    //     '${new Date().getTime()}'
    //   )
    // `
    // );
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
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
  });

  it("should not be able to create a new category with same name for another", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
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
