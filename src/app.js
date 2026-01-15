const express = require("express");
const store = require("./store");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.status(200).json({ ok: true }));

app.get("/products", (req, res) => {
  res.json(store.products);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required" });
  }
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ error: "price must be a positive number" });
  }
  const product = { id: store.nextId++, name, price };
  store.products.push(product);
  res.status(201).json(product);
});

module.exports = app;
