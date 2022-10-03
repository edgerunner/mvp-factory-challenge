import PercentagePieChart from "./PercentagePieChart.js";

const sample = [
    { name: "Project 1", total: 3750 },
    { name: "Project 2", total: 500 },
    { name: "Project 3", total: 7500 },
];

describe("<PercentagePieChart>", function() {
    it("renders the given data as percentages", function() {
        cy.mount(<PercentagePieChart data={sample}/>);

        cy.contains("text", "32%").should("have.attr", "name", "Project 1");
        cy.contains("text", "4%").should("have.attr", "name", "Project 2");
        cy.contains("text", "64%").should("have.attr", "name", "Project 3");

        cy.contains("ul.legend li", "Project 1");
        cy.contains("ul.legend li", "Project 2");
        cy.contains("ul.legend li", "Project 3");
    });
});