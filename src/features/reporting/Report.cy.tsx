import Report from "./Report";

import schema from "./Reports.schema";

describe("<Report>", {
    viewportWidth: 1200,
    viewportHeight: 800,
}, function() {
    this.beforeEach(function () {
        cy.fixture("projects").then(schema.projects.parse).as("projects");
        cy.fixture("gateways").then(schema.gateways.parse).as("gateways");
        cy.fixture("report").then(schema.report.parse).as("report");   
    });
    it("renders all projects and gateways", function() {
        cy.mount(
            <Report report={this.report} 
                projects={this.projects} 
                gateways={this.gateways} />);
        
        cy.log("data rendering");
        cy.contains("header", "Project 1").parent("article")
            .contains("tr", "2,493 USD").contains("07/29/2021");
        
        cy.contains("header", "Project 2").click().parent("article")
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
    it("renders single project", function() {
        cy.fixture("report-project2").then(res => {
            cy.mount(
                <Report report={schema.report.parse(res)}
                    projects={this.projects} 
                    gateways={this.gateways} />);    
        });

        cy.log("data rendering");
        cy.contains("header", "Gateway 2").click().parent("article")
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
        cy.fixture("report-gateway1").then(res => {
            cy.mount(
                <Report report={schema.report.parse(res)}
                    projects={this.projects} 
                    gateways={this.gateways} />);
            
        });
        
        cy.log("data rendering");
        cy.contains("header", "Project 2").click().parent("article")
            .contains("tr", "2,664 USD").contains("04/11/2021");
        
        cy.log("header rendering");
        cy.contains("section > header:first-child", "Gateway 1")
            .contains("All projects");

        cy.log("column rendering");
        cy.contains("th", "Gateway").should("not.exist");
        cy.contains("th", "Project").should("not.exist");
    });
    it("renders single project and gateway", function() {
        cy.fixture("report-project1-gateway2").then(res => {
            cy.mount(
                <Report report={schema.report.parse(res)}
                    projects={this.projects} 
                    gateways={this.gateways} />);
        });
        
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
        cy.fixture("report").then(schema.report.parse).as("report");
        cy.mount(
            <Report report={this.report} 
                projects={this.projects} 
                gateways={this.gateways} />);

        cy.contains("footer", "Total").contains("190,740 USD");
    });

    it("sorts results by date ascending", function() {
        cy.fixture("report").then(schema.report.parse).as("report");
        cy.mount(
            <Report report={this.report} 
                projects={this.projects} 
                gateways={this.gateways} />);

        cy.get("table").first().within(function() {
            cy.get("tr:first-of-type time, tr:last-of-type time")
                .spread(function(first, last) {
                    expect(new Date(first.attributes.datetime.value))
                        .to.be.lessThan(new Date(last.attributes.datetime.value));
                });
        });
    });
});