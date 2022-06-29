import { Children, useMemo } from "react";

export default function Table({ children: columns, data }) {
    const schema = useMemo(() => makeSchema(columns), [columns]);

    return (
        <table>
            <thead>
                <HeadRow schema={schema} />
            </thead>
            <tbody>
                {data.map((row, index) => <Row schema={schema} data={row} key={row.key || row.id || index} />)}
            </tbody>
        </table>
    );
}

export function Column() { return null; }

function Row({ schema, data }) {
    return (
        <tr>
            {schema.map(({ render, id }, index) => 
                <td key={id || index}>{render(data)}</td>)}
        </tr>
    );
}

function HeadRow({ schema }) {
    return (
        <tr>
            {schema.map(({ header, id }, index) => 
                <th scope="col" key={id || index}>{header}</th>)}
        </tr>
    );
}

function makeSchema(columns) {
    return Children.map(columns, 
        ({ props: { children: render, id, header } }) => ({ render, id, header })
    );
}