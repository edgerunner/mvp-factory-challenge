import Summary from "./Summary";
import { Currency } from "/src/components";

describe("<Summary>", function() {
    it("just wraps its contents", function() {
        cy.mount(<Summary>Project Total | <Currency amount={18500}/></Summary>);
    });
});