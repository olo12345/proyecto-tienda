import request from "supertest";
import app from "../index.js";

describe("Server routes", () => {

  test("Devuelve 404 en rutas inexistentes", async () => {
    const res = await request(app).get("/ruta-que-no-existe");

    expect(res.statusCode).toBe(404);
  });

});