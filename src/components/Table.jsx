import { Children, useMemo } from "react";

export default function Table({ children: columns, data }) {
    const schema = useMemo(() => makeSchema(columns), [columns]);

    return (
        <table>
            <thead>{columns}</thead>
            <tbody>
                {data.map((row, index) => <Row schema={schema} data={row} key={row.key || row.id || index} />)}
            </tbody>
        </table>
    );
}

export function Column({ header, id }) { 
    return (
        <th scope="col" id={id}>{header}</th>
    ); 
}

function Row({ schema, data }) {
    return (
        <tr>
            {schema.map(({ render, id }, index) => 
                <td key={id || index}>{render(data)}</td>)}
        </tr>
    );
}


function makeSchema(columns) {
    return Children.map(columns, 
        ({ props: { children: render, id, header } }) => ({ render, id, header })
    );
}