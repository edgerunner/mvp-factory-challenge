import Table from "./Table";

export default function DataBlock({ children: columns, data }) {
    return (
        <article>
            <Table data={data}>
                {columns}
            </Table>
        </article>
    );
}