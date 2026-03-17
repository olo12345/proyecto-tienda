import request from "supertest";
import app from "../index.js";

describe("Rutas de libros", () => {

  test("GET /api/libros debería responder 200", async () => {
    const res = await request(app).get("/api/libros");

    expect(res.statusCode).toBe(200);
  });

});