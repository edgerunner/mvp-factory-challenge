import Date_ from "./Date";

describe("<Date>", function() {
    it("shows a date in the MM/DD/YYYY format", function() {
        cy.mount(<Date_ date={new Date("2017-06-23")}/>);
        cy.get("time").contains("06/23/2017");
    });
    it("renders the full ISO date into the time attribute", function() {
        cy.mount(<Date_ date={new Date("2017-06-23")}/>);
        cy.get("time").should("have.attr", "datetime", "2017-06-23T00:00:00.000Z");
    });
});