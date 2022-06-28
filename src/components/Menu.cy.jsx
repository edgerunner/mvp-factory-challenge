import Menu from "./Menu";

describe("<Menu>", function() {
    it("shows only the button when not open", function() {
        cy.mount(
            <Menu title="Closed">
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Item>Item 2</Menu.Item>
            </Menu>
        );
        cy.get("button").contains("Closed");
        cy.get("li").should("not.exist");
    });
    it("shows the <Menu.Item>s when open", function() {
        cy.mount(
            <Menu title="Open">
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Item>Item 2</Menu.Item>
            </Menu>
        );
        cy.get("button").click();
        cy.get("menu li").should("have.length", 2);
    });
    it("emits onSelect event with the item ID when an item is clicked", function() {
        const onSelect = cy.stub().as("onSelect");
        cy.mount(
            <Menu title="Open" onSelect={onSelect}>
                <Menu.Item id="item-1">Item 1</Menu.Item>
                <Menu.Item id="item-2">Item 2</Menu.Item>
            </Menu>
        );
        cy.get("button").click();
        cy.get("menu li").first().click();
        cy.get("@onSelect").should("have.been.calledOnce");
        cy.get("@onSelect").should("have.been.calledWith", "item-1");
    });
    it("closes when selected", function() {
        cy.mount(
            <Menu title="Select">
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Item>Item 2</Menu.Item>
            </Menu>
        );
        cy.get("button").click();
        cy.get("menu li").first().click();
        cy.get("button").should("exist");
        cy.get("menu li").should("not.exist");
    });
    describe("<Item>", function() {
        it("renders its contents", function() {
            cy.mount(
                <Menu title="Select">
                    <Menu.Item>Item <b>1</b></Menu.Item>
                    <Menu.Item>Item <i>2</i></Menu.Item>
                </Menu>
            );
            cy.get("button").click();
            cy.get("button menu li").first()
                .contains("Item 1")
                .find("b").contains("1");
        });
        it("emits onSelect event when clicked");
    });
});