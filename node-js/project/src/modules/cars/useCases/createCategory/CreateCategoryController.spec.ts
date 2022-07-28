import request from "supertest";

import { app } from "@shared/infra/http/start/app";

describe("Create Category Controller", async () => {
  await request(app).get("/cars/available").expect(200);
});
