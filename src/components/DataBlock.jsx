import Table from "./Table";

export default function DataBlock({ children: columns, data, header }) {
    return (
        <article>
            {header && <header>{header}</header>}
            <Table data={data}>
                {columns}
            </Table>
        </article>
    );
}