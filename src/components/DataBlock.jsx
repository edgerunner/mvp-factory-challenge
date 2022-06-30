import Table from "./Table";

export default function DataBlock({ children: columns, data, header, open }) {
    return (
        <article>
            {header && <header>{header}</header>}
            {open && <Table data={data}>{columns}</Table>}
        </article>
    );
}