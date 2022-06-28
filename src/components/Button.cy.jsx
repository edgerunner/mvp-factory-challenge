import Button from "./Button";

describe("<Button>", () => {
    it("renders its contents", function() {
        cy.mount(<Button>Hello</Button>);
        cy.get("button").contains("Hello");
    });
    it("picks its theme color");
    it("renders its icon");
    it("emits a click event");
});
