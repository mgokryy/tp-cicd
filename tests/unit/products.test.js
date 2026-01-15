const request = require("supertest");
const app = require("../../src/app");

describe("Products", () => {
  it("GET /products returns an array", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /products creates a product", async () => {
    const res = await request(app)
      .post("/products")
      .send({ name: "Headset", price: 29.99 });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Headset");
  });

  it("POST /products fails if invalid", async () => {
    const res = await request(app).post("/products").send({ name: "", price: -1 });
    expect(res.statusCode).toBe(400);
  });
});
