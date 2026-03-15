import request from "supertest";
import app from "../index.js";

describe("Auth routes", () => {

  test("POST /api/auth/login debería responder", async () => {

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBeDefined();
  });

});