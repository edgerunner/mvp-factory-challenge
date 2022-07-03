import Report from "./Report";
import { report, projects, gateways } from "/cypress/fixtures";

describe("<Report>", function() {
    it("renders the the given data", function() {
        cy.mount(
            <Report report={report.data} 
                projects={projects.data} 
                gateways={gateways.data} />);
        cy.contains("tr", "2,493 USD").contains("07/29/2021");
    });
    it("partitions data by project", function() {
        cy.mount(
            <Report report={report.data} 
                projects={projects.data} 
                gateways={gateways.data} />);
        cy.contains("article", "Project 1")
            .contains("tr", "2,493 USD").contains("07/29/2021");
    });
    it("consolidates data for a single project");
    it("consolidates data for a single gateway");
    it("consolidates data for single project and gateway");
});