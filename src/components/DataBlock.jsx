import Table from "./Table";
import "./DataBlock.css";

export default function DataBlock({ children: columns, data, header, open }) {
    return (
        <article>
            {header && <header>{header}</header>}
            {open && <Table data={data}>{columns}</Table>}
        </article>
    );
}