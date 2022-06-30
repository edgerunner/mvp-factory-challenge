import ReportToolbar from "./ReportToolbar";

const projects = [
    { id: "p1", name: "Project 1" },
    { id: "p2", name: "Project 2" },
];

const gateways = [
    { id: "g1", name: "Gateway 1" },
    { id: "g2", name: "Gateway 2" },
];

describe("<ReportToolbar>", function() {
    beforeEach(function () {
        cy.viewport(800, 400);
        cy.mount(<ReportToolbar projects={projects} gateways={gateways} />);
    });
    it("renders a project selector", function() {
        cy.get("button").contains("All projects").click();
        cy.contains("Project 1");
        cy.contains("Project 2");
    });
    it("renders a gateway selector", function() {
        cy.get("button").contains("All gateways").click();
        cy.contains("Gateway 1");
        cy.contains("Gateway 2");
    });
    it("renders from-to date selectors", function() {
        cy.get("button").contains("From date")
            .next().contains("To date");
    });
    it("renders a generate report action button", function() {
        cy.get("button").contains("Generate report").should("have.class", "action");
    });
    describe("emits an onSubmit event when the generate report button is clicked", function () {
        it("without parameters for the 'All …' values");
        it("with parameters for the project and gateway values");
        it("with a single project parameter");
        it("with a single gateway parameter");
    });
});