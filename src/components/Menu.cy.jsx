describe("<Menu>", function() {
    it("shows only the button when not open");
    it("shows the <Menu.Item>s when open");
    it("emits onSelect event with the item ID when an item is clicked");
    it("closes when selected");
    describe("<Item>", function() {
        it("renders its contents");
        it("emits onSelect event when clicked");
    });
});