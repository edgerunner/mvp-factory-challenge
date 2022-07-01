import ReportsHeader from "./ReportsHeader";
import ReportToolbar from "./ReportToolbar";

const projects = [
    { id: "p1", name: "Project 1" },
    { id: "p2", name: "Project 2" },
];

const gateways = [
    { id: "g1", name: "Gateway 1" },
    { id: "g2", name: "Gateway 2" },
];

describe("<ReportsHeader>", {
    viewportWidth: 1200,
    viewportHeight: 400,
}, function() {
    it("wraps the <ReportToolbar>", function() {
        cy.mount(
            <ReportsHeader>
                <ReportToolbar projects={projects} gateways={gateways} />
            </ReportsHeader>
        );
        cy.get("header#reports-header h1").contains("Reports");
        cy.get("header#reports-header nav#report-toolbar");
    });
});