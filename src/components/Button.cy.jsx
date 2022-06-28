import Button from "./Button";

describe("<Button>", () => {
    it("renders its contents", function() {
        cy.mount(<Button>Hello</Button>);
        cy.get("button").contains("Hello");
    });
    it("picks its base colors", function() {
        cy.mount(<Button>Base</Button>);
        cy.get("button")
            .css()
            .should("include", { 
                "background-color": "rgb(27, 197, 189)",
                "color": "rgb(255, 255, 255)"
            });
    });
    it("picks its action mode colors", function() {
        cy.mount(<Button action>Action</Button>);
        cy.get("button")
            .should("have.class", "action")
            .css()
            .should("include", { 
                "background-color": "rgb(0, 91, 150)"
            });
    });
    it("renders its icon");
    it("emits a click event");
});
