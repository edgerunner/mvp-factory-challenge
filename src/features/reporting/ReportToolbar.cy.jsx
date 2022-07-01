import ReportToolbar from "./ReportToolbar";

const projects = [
    { id: "p1", name: "Project 1" },
    { id: "p2", name: "Project 2" },
];

const gateways = [
    { id: "g1", name: "Gateway 1" },
    { id: "g2", name: "Gateway 2" },
];

describe("<ReportToolbar>", {
    viewportWidth: 800,
    viewportHeight: 400,
}, function() {
    beforeEach(function () {
        const onSubmit = cy.stub().as("onSubmit");
        cy.mount(
            <ReportToolbar 
                projects={projects}
                gateways={gateways}
                onSubmit={onSubmit} />
        );
    });
    it("renders a project selector", function() {
        cy.get("button").contains("All projects").click();
        cy.get("menu li").contains("Project 1");
        cy.get("menu li").contains("Project 2").click();
        cy.get("button").contains("Project 2").click();
        cy.get("menu li").contains("All projects").click();
        cy.get("button").contains("All projects");
    });
    it("renders a gateway selector", function() {
        cy.get("button").contains("All gateways").click();
        cy.get("menu li").contains("Gateway 2");
        cy.get("menu li").contains("Gateway 1").click();
        cy.get("button").contains("Gateway 1").click();
        cy.get("menu li").contains("All gateways").click();
        cy.get("button").contains("All gateways");
    });
    it("renders from-to date selectors", function() {
        cy.get("button").contains("From date")
            .next().contains("To date");
    });
    it("renders a generate report action button", function() {
        cy.get("button").contains("Generate report").should("have.class", "action");
    });
    describe("emits an onSubmit event when the generate report button is clicked", function () {
        it("without parameters for the 'All …' values", function() {
            cy.get("button").contains("Generate report").click();
            cy.get("@onSubmit").should("be.calledWith", {});
        });
        it("with parameters for the project and gateway values", function() {
            cy.get("button").contains("All projects").click();
            cy.get("menu li").contains("Project 1").click();
            cy.get("button").contains("All gateways").click();
            cy.get("menu li").contains("Gateway 2").click();
            cy.get("button").contains("Generate report").click();
            cy.get("@onSubmit").should("be.calledWith", {
                project: "p1",
                gateway: "g2"
            });
        });
        it("with a single project parameter", function() {
            cy.get("button").contains("All projects").click();
            cy.get("menu li").contains("Project 1").click();
            cy.get("button").contains("Generate report").click();
            cy.get("@onSubmit").should("be.calledWith", {
                project: "p1"
            });
        });
        it("with a single gateway parameter", function() {
            cy.get("button").contains("All gateways").click();
            cy.get("menu li").contains("Gateway 2").click();
            cy.get("button").contains("Generate report").click();
            cy.get("@onSubmit").should("be.calledWith", {
                gateway: "g2"
            });
        });
    });
});