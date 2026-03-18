import request from "supertest";
import app from "./../server.js";

describe("Checkout routes", () => {

  test("POST /api/checkout debería responder", async () => {

    const res = await request(app)
      .post("/api/checkout")
      .send({
        libros: [1,2,3]
      });

    expect(res.statusCode).toBeDefined();
  });

});