import ReportsHeader from "./ReportsHeader";
import ReportToolbar from "./ReportToolbar";

const projects = [
    { projectId: "p1", name: "Project 1" },
    { projectId: "p2", name: "Project 2" },
];

const gateways = [
    { gatewayId: "g1", name: "Gateway 1" },
    { gatewayId: "g2", name: "Gateway 2" },
];

describe("<ReportsHeader>", {
    viewportWidth: 1200,
    viewportHeight: 400,
}, function() {
    it("wraps the <ReportToolbar>", function() {
        cy.mount(
            <ReportsHeader>
                <ReportToolbar projects={projects} gateways={gateways} onSubmit={cy.stub()}/>
            </ReportsHeader>
        );
        cy.get("header#reports-header h1").contains("Reports");
        cy.get("header#reports-header nav#report-toolbar");
    });
});