import Report from "./Report";
import { 
    report,
    reportProject2,
    reportGateway1,
    reportProject1Gateway2,
    projects, gateways 
} from "/cypress/fixtures";

describe("<Report>", {
    viewportWidth: 1200,
    viewportHeight: 800,
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

        cy.log("partition ordering");
        cy.contains("header", "Project 1").parent("article")
            .next("article").contains("header", "Project 2");
        
        cy.log("column rendering");
        cy.contains("th", "Gateway").should("exist");
        cy.contains("th", "Project").should("not.exist");
    });
    it.only("renders single project", function() {
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

        cy.log("partition ordering");
        cy.contains("header", "Gateway 1").parent("article")
            .next("article").contains("header", "Gateway 2");

        cy.log("column rendering");
        cy.contains("th", "Gateway").should("not.exist");
        cy.contains("th", "Project").should("not.exist");

        cy.log("chart rendering");
        cy.contains(".chart .legend", "Gateway");
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

        cy.log("column rendering");
        cy.contains("th", "Gateway").should("not.exist");
        cy.contains("th", "Project").should("not.exist");
    });
    it("renders single project and gateway", function() {
        cy.mount(
            <Report report={reportProject1Gateway2.data} 
                projects={projects.data} 
                gateways={gateways.data} />);
        
        cy.log("data rendering");
        cy.get("article")
            .contains("tr", "02/15/2021").contains("73 USD");
        
        cy.log("header rendering");
        cy.contains("section > header:first-child", "Project 1")
            .contains("Gateway 2");
        cy.get("article > header").should("not.exist");

        cy.log("column rendering");
        cy.contains("th", "Gateway").should("not.exist");
        cy.contains("th", "Project").should("not.exist");
    });

    it("shows the total amount", function() {
        cy.mount(
            <Report report={report.data} 
                projects={projects.data} 
                gateways={gateways.data} />);

        cy.contains("footer", "Total").contains("190,740 USD");
    });
});