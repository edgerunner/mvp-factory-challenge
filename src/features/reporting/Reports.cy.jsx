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
            cy.wait("@projects");
            cy.wait("@gateways");
        });
        it("renders the reports toolbar when the request succeeds", function() {
            cy.wait("@projects");
            cy.wait("@gateways");
            cy.get("#report-toolbar");
        });
        it("renders error message if the request fails", function() {
            cy.intercept("GET", "**/projects", { statusCode: 500 }).as("projects");
            cy.mount(<Reports />);
            cy.get("#reports-header button").contains("Retry");
        });
    });

    describe("submits report requests", function() {
        it("for all projects and gateways");
        it("for a single project and gateway");
        it("for a single project and all gateways");
        it("for a single gateway and all projects");
    });

    describe("renders reports", function() {
        it("for all projects and gateways");
        it("for a single project and gateway");
        it("for a single project and all gateways");
        it("for a single gateway and all projects");
    });
});