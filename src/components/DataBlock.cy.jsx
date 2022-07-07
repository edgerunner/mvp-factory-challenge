import { Column } from "./Table";
import DataBlock from "./DataBlock";

const sample = [
    { id: 1, name: "John", age: 20 },
    { id: 2, name: "Jane", age: 21 },
    { id: 3, name: "Joe", age: 22 },
];

describe("<DataBlock>", function() {
    it("wraps and passes its <Column>s to a <Table>", function() {
        cy.mount(
            <DataBlock open data={sample}>
                <Column header="ID">{row => row.id}</Column>
                <Column header="Name">{row => row.name}</Column>
                <Column header="Age">{row => row.age}</Column>
            </DataBlock>
        );
        cy.get("article table tr:nth-child(1) td:nth-child(2)").contains("John");
        cy.get("article table tr:nth-child(3) td:nth-child(3)").contains("22");
    });
    it("renders a header block", function() {
        cy.mount(
            <DataBlock open data={sample} header={<h3>Sample data</h3>}>
                <Column header="ID">{row => row.id}</Column>
                <Column header="Name">{row => row.name}</Column>
                <Column header="Age">{row => row.age}</Column>
            </DataBlock>
        );
        cy.get("article header h3").contains("Sample data");

    });
    it("does not render the <Table> when not open", function() {
        cy.mount(
            <DataBlock data={sample} header={<h3>Sample data</h3>}>
                <Column header="ID">{row => row.id}</Column>
                <Column header="Name">{row => row.name}</Column>
                <Column header="Age">{row => row.age}</Column>
            </DataBlock>
        );
        cy.get("article table").should("not.exist");
        cy.get("article header h3").contains("Sample data");
    });

    it("fires the onToggle event when its header is clicked", function() {
        cy.mount(
            <DataBlock data={sample} header={<h3>Sample data</h3>}
                onToggle={cy.stub().as("onToggle")}>
                <Column header="ID">{row => row.id}</Column>
                <Column header="Name">{row => row.name}</Column>
                <Column header="Age">{row => row.age}</Column>
            </DataBlock>
        );
        cy.get("article header").click();
        cy.get("@onToggle").should("be.called");
    });
});