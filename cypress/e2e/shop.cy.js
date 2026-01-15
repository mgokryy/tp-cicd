describe("API SHOP - E2E", () => {
  it("health endpoint is available", () => {
    cy.request("http://localhost:3000/health")
      .its("status")
      .should("eq", 200);
  });

  it("can create and retrieve a product", () => {
    cy.request("POST", "http://localhost:3000/products", {
      name: "CypressProduct",
      price: 99
    })
      .its("status")
      .should("eq", 201);

    cy.request("http://localhost:3000/products")
      .its("body")
      .should((products) => {
        expect(
          products.some(p => p.name === "CypressProduct")
        ).to.eq(true);
      });
  });
});
