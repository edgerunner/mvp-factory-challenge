import Menu from "./Menu";

describe("<Menu>", function() {
    it("shows only the button when not open", function() {
        cy.mount(
            <Menu title="Closed">
                <Menu.Item id="item-1">Item 1</Menu.Item>
                <Menu.Item id="item-2">Item 2</Menu.Item>
            </Menu>
        );
        cy.get("button").contains("Closed");
        cy.get("li").should("not.exist");
    });
    it("shows the <Menu.Item>s when open", function() {
        cy.mount(
            <Menu title="Open">
                <Menu.Item id="item-1">Item 1</Menu.Item>
                <Menu.Item id="item-2">Item 2</Menu.Item>
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
                <Menu.Item id="item-1">Item 1</Menu.Item>
                <Menu.Item id="item-2">Item 2</Menu.Item>
            </Menu>
        );
        cy.get("button").click();
        cy.get("menu li").first().click();
        cy.get("button").should("exist");
        cy.get("menu li").should("not.exist");
    });
    it("keeps its size when opened", function() {
        cy.mount(
            <Menu title="Select">
                <Menu.Item id="item-1">Item 1</Menu.Item>
                <Menu.Item id="item-2">Item 2</Menu.Item>
            </Menu>
        );
        cy.get("button.Menu").then(([closedMenu]) => {
            const { width, height } = closedMenu.getBoundingClientRect();
            cy.get("button.Menu").click().then(([openMenu]) => {
                const { width: openWidth, height: openHeight } = openMenu.getBoundingClientRect();
                expect(openWidth).to.equal(width);
                expect(openHeight).to.equal(height);
            });
        });




    });
    describe("<Item>", function() {
        it("renders its contents", function() {
            cy.mount(
                <Menu title="Select">
                    <Menu.Item id="item-1">Item <b>1</b></Menu.Item>
                    <Menu.Item id="item-2">Item <i>2</i></Menu.Item>
                </Menu>
            );
            cy.get("button").click();
            cy.get("button menu li").first()
                .contains("Item 1")
                .find("b").contains("1");
        });
        it("emits onSelect event when clicked", function() {
            const onSelect1 = cy.stub().as("onSelect1");
            const onSelect2 = cy.stub().as("onSelect2");
            cy.mount(
                <Menu title="Select">
                    <Menu.Item onSelect={onSelect1}>Item 1</Menu.Item>
                    <Menu.Item onSelect={onSelect2}>Item 2</Menu.Item>
                </Menu>
            );
            cy.get("button").click();
            cy.get("button menu li").first().click();
            cy.get("@onSelect1").should("have.been.calledOnce");
            cy.get("@onSelect2").should("not.have.been.called");
        });
    });
});