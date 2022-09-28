import Currency from "./Currency";
describe("<Currency>", function() {
    it("renders integer amounts", function() {
        cy.mount(<Currency amount={123} code="USD"/>);
        cy.get("data").contains("123 USD");
    });
    it("rounds float amounts", function() {
        cy.mount(<Currency amount={123.45} code="EUR"/>);
        cy.get("data").contains("123 EUR");
    });
    it("rounds to the nearest integer", function() {
        cy.mount(<Currency amount={123.57} code="SEK"/>);
        cy.get("data").contains("124 SEK");
    });

    it("shows thousands separators", function() {
        cy.mount(<Currency amount={1234567} code="USD"/>);
        cy.get("data").contains("1,234,567 USD");
    });
});