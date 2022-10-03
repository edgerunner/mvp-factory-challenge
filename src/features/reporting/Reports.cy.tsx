import Reports from "./Reports";

describe("<Reports>", {
    viewportWidth: 1280,
    viewportHeight: 720,
}, function() {
    beforeEach(function() {
        cy.intercept("GET", "**/projects", { fixture: "projects" }).as("projects");
        cy.intercept("GET", "**/gateways", { fixture: "gateways" }).as("gateways");
        cy.mount(<Reports />);
    });
    it("renders placeholder pane on mount", function() {
        cy.get("#reports-placeholder h1").contains("No reports");
    });
    
    describe("projects and gateways", function() {
        it("requests the list of projects and gateways on mount", function() {
            cy.wait(["@projects", "@gateways"]);
        });
        it("renders the reports toolbar when the request succeeds", function() {
            cy.wait(["@projects", "@gateways"]);
            cy.get("#report-toolbar");
        });
        it("renders error message if the request fails", function() {
            cy.intercept("GET", "**/projects", { statusCode: 500 }).as("projects");
            cy.mount(<Reports />);
            cy.wait(["@projects", "@gateways"]);
            cy.get("#reports-header button").contains("Retry");
        });
    });

    describe("submits report requests", function() {
        beforeEach(function() {
            cy.intercept("POST", "**/report", {
                code: 200, data: [], error: null
            }).as("report");
            cy.wait(["@projects", "@gateways"]);
        });
        it("for all projects and gateways", function() {
            cy.get("#report-toolbar button.action").contains("report").click();
            cy.wait("@report")
                .its("request.body")
                .should("not.have.keys", ["projectId", "gatewayId"]);
        });
        it("for a single project and gateway", function() {
            cy.get("#report-toolbar").within(() => {
                cy.get("button").contains("project").click();
                cy.get("menu li").contains("Project 1").click();
                cy.get("button").contains("gateway").click();
                cy.get("menu li").contains("Gateway 2").click();
                cy.get("button.action").contains("report").click();
            });
            cy.wait("@report")
                .its("request.body")
                .should("have.keys", ["projectId", "gatewayId"]);
        });
        it("for a single project and all gateways", function() {
            cy.get("#report-toolbar").within(() => {
                cy.get("button").contains("project").click();
                cy.get("menu li").contains("Project 1").click();
                cy.get("button.action").contains("report").click();
            });
            cy.wait("@report")
                .its("request.body")
                .should("have.key", "projectId")
                .and("not.have.key", "gatewayId");
        });
        it("for a single gateway and all projects", function() {
            cy.get("#report-toolbar").within(() => {
                cy.get("button").contains("gateway").click();
                cy.get("menu li").contains("Gateway 2").click();
                cy.get("button.action").contains("report").click();
            });
            cy.wait("@report")
                .its("request.body")
                .should("have.key", "gatewayId")
                .and("not.have.key", "projectId");
        });
    });

    it("renders the received report", function() {
        cy.wait(["@projects", "@gateways"]);
        cy.intercept("POST", "**/report", { fixture: "report" }).as("report");
        cy.get("#report-toolbar button.action").contains("report").click();
        cy.wait("@report");
        cy.get("#reports-placeholder").should("not.exist");
        cy.get("#report").should("exist");
    });

    it.only("renders placeholder for empty reports", function() {
        cy.wait(["@projects", "@gateways"]);
        cy.intercept("POST", "**/report", { code: "200", data: [], error: null }).as("report");
        cy.get("#report-toolbar button.action").contains("report").click();
        cy.wait("@report");
        cy.get("#reports-placeholder").should("exist");
    });
});