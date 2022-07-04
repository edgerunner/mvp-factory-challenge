import Report from "./Report";
import { report, reportProject2, projects, gateways } from "/cypress/fixtures";

describe("<Report>", function() {
    it("renders all projects and gateways", function() {
        cy.mount(
            <Report report={report.data} 
                projects={projects.data} 
                gateways={gateways.data} />);
        
        cy.log("data rendering");
        cy.contains("article", "Project 1")
            .contains("tr", "2,493 USD").contains("07/29/2021");
        cy.contains("article", "Project 2")
            .contains("tr", "2,664 USD").contains("04/11/2021");
        
        cy.log("header rendering");
        cy.contains("section > header:first-child", "All projects")
            .contains("All gateways");
    });
    it("renders single project", function() {
        cy.mount(
            <Report report={reportProject2.data} 
                projects={projects.data} 
                gateways={gateways.data} />);
        
        cy.log("data rendering");
        cy.contains("article", "Project 2")
            .contains("tr", "2,664 USD").contains("04/11/2021");
        
        cy.log("header rendering");
        cy.contains("section > header:first-child", "Project 2")
            .contains("All gateways");
    });
    it("renders single gateway");
    it("renders single project and gateway");
});