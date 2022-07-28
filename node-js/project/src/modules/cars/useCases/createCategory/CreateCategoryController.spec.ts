import request from "supertest";

import { app } from "@shared/infra/http/start/app";

describe("Create Category Controller", () => {
  it("should be able to create a new category", async () => {
    const response = await request(app).post("/categories").send({
      name: "Category supertest",
      description: "Description category supertest",
    });

    expect(response.status).toBe(201);
  });
});
