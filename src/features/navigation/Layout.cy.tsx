import Layout from "./Layout";

describe("<Layout>", {
    viewportWidth: 1440,
    viewportHeight: 900,
}, function() {
    it("renders layout components", function() {
        cy.mount(
            <Layout><main id="test">Actual content</main></Layout>
        );
            
        cy.get("#app main#test");
        cy.get("#app header#app-header");
        cy.get("#app nav#nav-menu");
        cy.get("#app footer#app-footer");
    });
});