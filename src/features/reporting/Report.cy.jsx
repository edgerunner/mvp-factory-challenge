import Report from "./Report";
import { 
    report, reportProject2, reportGateway1, projects, gateways 
} from "/cypress/fixtures";

describe("<Report>", {
    viewportWidth: 800,
    viewportHeight: 600,
}, function() {
    it("renders all projects and gateways", function() {
        cy.mount(
            <Report report={report.data} 
                projects={projects.data} 
                gateways={gateways.data} />);
        
        cy.log("data rendering");
        cy.contains("header", "Project 1").parent("article")
            .contains("tr", "2,493 USD").contains("07/29/2021");
        
        cy.contains("header", "Project 2").parent("article")
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
        cy.contains("header", "Gateway 2").parent("article")
            .contains("tr", "147 USD").contains("05/29/2021");
        
        cy.log("header rendering");
        cy.contains("section > header:first-child", "Project 2")
            .contains("All gateways");
    });
    it("renders single gateway", function() {
        cy.mount(
            <Report report={reportGateway1.data} 
                projects={projects.data} 
                gateways={gateways.data} />);
        
        cy.log("data rendering");
        cy.contains("header", "Project 2").parent("article")
            .contains("tr", "2,664 USD").contains("04/11/2021");
        
        cy.log("header rendering");
        cy.contains("section > header:first-child", "Gateway 1")
            .contains("All projects");
    });
    it("renders single project and gateway");
});