describe("Reporting", {
    viewportWidth: 1440,
    viewportHeight: 900,
}, function() {
    it("can list all transactions", function() {
        cy.visit("/");

        cy.contains("button.action", "report").click();

        cy.contains("header", "All projects");
        cy.contains("header", "All gateways");

        cy.get("table").should("exist");
        cy.get("div.chart").should("not.exist");

        cy.contains("footer", /total/i);
    });
});