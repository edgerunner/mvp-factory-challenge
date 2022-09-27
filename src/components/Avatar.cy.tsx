import Avatar from "./Avatar";

describe("<Avatar>", function() {
    describe("given a full name", function() {
        it("renders a single initial", function() {
            cy.mount(<Avatar name="Jon" />);
            cy.get("span.avatar")
                .should("have.class", "initials-1")
                .and("have.attr", "title", "Jon")
                .and("have.text", "J")
                .and("not.have.text", "Jon");
        });
        it("renders two initials", function() {
            cy.mount(<Avatar name="Jon Hicks" />);
            cy.get("span.avatar")
                .should("have.class", "initials-2")
                .and("have.attr", "title", "Jon Hicks")
                .and("have.text", "JH")
                .and("not.have.text", "Jon Hicks");
        });
        it("renders three initials", function() {
            cy.mount(<Avatar name="Ladislao Camarena Solis" />);
            cy.get("span.avatar")
                .should("have.class", "initials-3")
                .and("have.attr", "title", "Ladislao Camarena Solis")
                .and("have.text", "LCS")
                .and("not.have.text", "Ladislao Camarena Solis");
        });
        it("renders three initials max", function() {
            cy.mount(<Avatar name="Sandra Patricia Panqueva Avendaño" />);
            cy.get("span.avatar")
                .should("have.class", "initials-3")
                .and("have.attr", "title", "Sandra Patricia Panqueva Avendaño")
                .and("have.text", "SPP")
                .and("not.have.text", "SPPA")
                .and("not.have.text", "Sandra Patricia Panqueva Avendaño");
        });
    });
});