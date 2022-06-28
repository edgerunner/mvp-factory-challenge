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
    it("closes when selected");
    describe("<Item>", function() {
        it("renders its contents");
        it("emits onSelect event when clicked");
    });
});