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

    it("can list transactions for a single project", function() {
        cy.visit("/");

        cy.contains("button", /projects/i).click().get("menu li:last-child").click();
        cy.contains("button.action", "report").click();

        cy.contains("header", "All projects").should("not.exist");
        cy.contains("header", "All gateways");

        cy.get("table").should("exist");
        cy.get("div.chart").should("exist");

        cy.contains("footer", /total/i);

    });

    it("can list transactions for a single gateway", function() {
        cy.visit("/");

        cy.contains("button", /gateways/i).click().get("menu li:last-child").click();
        cy.contains("button.action", "report").click();

        cy.contains("header", "All projects");
        cy.contains("header", "All gateways").should("not.exist");

        cy.get("table").should("exist");
        cy.get("div.chart").should("exist");

        cy.contains("footer", /total/i);
    });

    it("can list transactions for a single project and gateway", function() {
        cy.visit("/");

        cy.contains("button", /projects/i).click().get("menu li:last-child").click();
        cy.contains("button", /gateways/i).click().get("menu li:last-child").click();
        cy.contains("button.action", "report").click();

        cy.contains("header", "All projects").should("not.exist");
        cy.contains("header", "All gateways").should("not.exist");

        cy.get("table").should("exist");
        cy.get("div.chart").should("not.exist");

        cy.contains("footer", /total/i);
    });
});