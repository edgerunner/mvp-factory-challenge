import { Children, useMemo } from "react";
import "./Table.css";

export default function Table({ children: columns, data }) {
    const schema = useMemo(() => makeSchema(columns), [columns]);

    return (
        <table>
            <thead><tr>{columns}</tr></thead>
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
    return Children.toArray(columns)
        .filter(child => child)
        .map( 
            ({ props: { children: render, id, header } }) => 
                ({ render, id, header })
        );
}