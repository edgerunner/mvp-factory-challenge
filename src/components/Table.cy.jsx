import Table, { Column } from "./Table";

const sample = [
    { id: 1, name: "John", age: 20 },
    { id: 2, name: "Jane", age: 21 },
    { id: 3, name: "Joe", age: 22 },
];
describe("<Table>", function() {
    it("renders data as specified by <Column>s", function() {
        cy.mount(
            <Table data={sample}>
                <Column>{row => row.id}</Column>
                <Column>{row => row.name}</Column>
                <Column>{row => row.age}</Column>
            </Table>
        );
        cy.get("table tr:nth-child(1) td:nth-child(2)").contains("John");
        cy.get("table tr:nth-child(3) td:nth-child(3)").contains("22");
    });
    it("renders column headers as specified by <Column>s", function() {
        cy.mount(
            <Table data={sample}>
                <Column header="ID">{row => row.id}</Column>
                <Column header="Name">{row => row.name}</Column>
                <Column header="Age">{row => row.age}</Column>
            </Table>
        );
        cy.get("table th:nth-child(1)").contains("ID");
        cy.get("table th:nth-child(2)").contains("Name");
        cy.get("table th:nth-child(3)").contains("Age");
    });
    it("renders a given caption", function() {
        cy.mount(
            <Table data={sample} caption="Sample Table">
                <Column>{row => row.id}</Column>
                <Column>{row => row.name}</Column>
                <Column>{row => row.age}</Column>
            </Table>
        );
        cy.get("caption").contains("Sample Table");
    });
});