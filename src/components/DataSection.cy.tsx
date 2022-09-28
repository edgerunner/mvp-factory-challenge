import DataSection from "./DataSection";
import { Column as TableColumn } from "./Table";
import "./DataSection.css";

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

const Column = TableColumn<typeof sample[0][number]>

const headerRenderProp = data =>
    data[0].age > 40 ? <h3>Senior</h3> : <h3>Junior</h3>;

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
    it("generates <DataBlock> headers with a render prop", function() {
        cy.mount(
            <DataSection data={sample} blockHeader={headerRenderProp}>
                <Column header="ID">{row => row.id}</Column>
                <Column header="Name">{row => row.name}</Column>
                <Column header="Age">{row => row.age}</Column>
            </DataSection>
        );
        cy.get("section article:first-child header").contains("Junior");
    });
    it("renders a header block", function() {
        cy.mount(
            <DataSection data={sample} header={<b>Sample data</b>}>
                <Column header="ID">{row => row.id}</Column>
                <Column header="Name">{row => row.name}</Column>
                <Column header="Age">{row => row.age}</Column>
            </DataSection>
        );
        cy.get("section > header b").contains("Sample data");
    });
    describe("accordion behavior", function() {
        it("initially opens the first block", function() {
            cy.mount(
                <DataSection data={sample} blockHeader={headerRenderProp}>
                    <Column header="ID">{row => row.id}</Column>
                    <Column header="Name">{row => row.name}</Column>
                    <Column header="Age">{row => row.age}</Column>
                </DataSection>
            );
            cy.get("section article:first-child table").should("be.visible");
            cy.get("section article:last-child table").should("not.exist");
        });
        it("toggles blocks on click", function() {
            cy.mount(
                <DataSection data={sample} blockHeader={headerRenderProp}>
                    <Column header="ID">{row => row.id}</Column>
                    <Column header="Name">{row => row.name}</Column>
                    <Column header="Age">{row => row.age}</Column>
                </DataSection>
            );
            cy.get("section article:first-child table").should("be.visible");
            cy.get("section article:last-child table").should("not.exist");
            
            cy.get("section article:last-child header").click();
            cy.get("section article:first-child table").should("not.exist");
            cy.get("section article:last-child table").should("be.visible");

            cy.get("section article:first-child header").click();
            cy.get("section article:first-child table").should("be.visible");
            cy.get("section article:last-child table").should("not.exist");
        });
    });
});