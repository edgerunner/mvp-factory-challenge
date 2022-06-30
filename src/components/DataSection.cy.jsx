import DataSection from "./DataSection";
import { Column } from "./Table";

const young = [
    { id: 1, name: "John", age: 20 },
    { id: 2, name: "Jane", age: 21 },
    { id: 3, name: "Joe", age: 22 },
];
const old = [
    { id: 10, name: "Jack", age: 60 },
    { id: 11, name: "Jill", age: 61 },
    { id: 12, name: "Jay", age: 62 },
];

const sample = [young, old];

describe("<DataSection>", function() {
    it("generates <DataBlock>s from its data and <Table.Column>s", function() {
        cy.mount(
            <DataSection data={sample}>
                <Column header="ID">{row => row.id}</Column>
                <Column header="Name">{row => row.name}</Column>
                <Column header="Age">{row => row.age}</Column>
            </DataSection>
        );
        cy.get("section article").should("have.length", 2);
        cy.get("article table tr:nth-child(1) td:nth-child(2)").contains("John");
        cy.get("article table tr:nth-child(3) td:nth-child(3)").contains("22");
    });
    it("generates <DataBlock> headers with a render prop");
    it("renders a header block");
});