import Reports from "./Reports";

describe("<Reports>", {
    viewportWidth: 1280,
    viewportHeight: 720,
}, function() {
    it("renders placeholder pane on mount", function() {
        cy.mount(<Reports />);
        cy.get("#reports-placeholder h1").contains("No reports");
    });
    
    describe("projects and gateways", function() {
        it("requests the list of projects and gateways on mount");
        it("renders the reports toolbar when the request succeeds");
        it("renders error message if the request fails");
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