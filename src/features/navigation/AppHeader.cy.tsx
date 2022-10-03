import AppHeader from "./AppHeader";

describe("<AppHeader>", {
    viewportWidth: 1440,
    viewportHeight: 100,
}, function() {
    it("renders logo, menu, and current user", function() {
        cy.mount(<AppHeader />);
        cy.get("header#app-header a#logo");
        cy.get("header#app-header button#nav-menu");
        cy.get("header#app-header div#current-user");
    });
});