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
    it("shows the <Menu.Item>s when open");
    it("emits onSelect event with the item ID when an item is clicked");
    it("closes when selected");
    describe("<Item>", function() {
        it("renders its contents");
        it("emits onSelect event when clicked");
    });
});