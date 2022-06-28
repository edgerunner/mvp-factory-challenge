import Currency from "./Currency";
describe("<Currency>", function() {
    it("renders integer amounts", function() {
        cy.mount(<Currency amount={123} code="USD"/>);
        cy.get("data").contains("123 USD");
    });
    it("rounds float amounts");
    it("renders currency code");
});