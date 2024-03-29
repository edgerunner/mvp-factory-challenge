import Table, { Column as TableColumn } from "./Table";


type Sample = { id: number, name: string, age: number }
const sample: Sample[] = [
    { id: 1, name: "John", age: 20 },
    { id: 2, name: "Jane", age: 21 },
    { id: 3, name: "Joe", age: 22 },
];

const Column = TableColumn<Sample>

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

    it("ignores null children safely", function() {
        cy.mount(
            <Table data={sample}>
                <Column header="ID">{row => row.id}</Column>
                {null}
                <Column header="Name">{row => row.name}</Column>
                <Column header="Age">{row => row.age}</Column>
            </Table>
        );
        cy.get("table").should("exist");
    });
});