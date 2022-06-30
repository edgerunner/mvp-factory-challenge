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
    it("renders a from-to date selectors");
    it("renders a generate report button");
    it("emits an onSubmit event when the generate report button is clicked");
});