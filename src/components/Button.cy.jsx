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
    it("renders its icon", function() {
        cy.mount(<Button icon="calendar">Calendar</Button>);
        cy.get("button").css()
            .its("background-image").should("match", /calendar/);
    });
    it("emits a click event", function() {
        const clickHandler = cy.stub().as("click-handler");
        cy.mount(<Button onClick={clickHandler}>Click me</Button>);
        cy.get("button").click();
        cy.get("@click-handler").should("have.been.calledOnce");
    });
    it("passes down other attributes", function() {
        cy.mount(<Button id="my-button" className="interesting">Hello</Button>);
        cy.get("button")
            .should("have.attr", "id", "my-button")
            .should("have.attr", "class", "interesting");
    });
    it("merges classnames", function() {
        cy.mount(<Button action className="interesting">Hello</Button>);
        cy.get("button")
            .should("have.class", "action")
            .should("have.class", "interesting");
    });
});
