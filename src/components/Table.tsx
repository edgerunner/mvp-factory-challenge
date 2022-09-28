import { Children, useMemo } from "react";
import "./Table.css";

type Props<Data> = {
    children: ColumnElement<Data>[]
    data: ({ key?: any, id?: any } & Data)[]
}


export default function Table<Data>({ children: columns, data }: Props<Data>): JSX.Element {
    const schema: Schema<Data>[] = useMemo(() => makeSchema<Data>(columns), [columns]);

    return (
        <table>
            <thead><tr>{columns}</tr></thead>
            <tbody>
                {data.map((row, index) => 
                    <Row<Data> schema={schema} data={row} key={row.key || row.id || index} />
                )}
            </tbody>
        </table>
    );
}

type Schema<Data> = {
    id?: string
    render(d: Data): React.ReactNode
}
type ColumnProps<Data> = Omit<Schema<Data>, "render"> & {
    children: Schema<Data>["render"]
    header?: string
}
type ColumnElement<Data> = React.ReactElement<ColumnProps<Data>, typeof Column>

export function Column<Data>({ header, id }: ColumnProps<Data>): ColumnElement<Data> { 
    return (
        <th scope="col" id={id}>{header}</th>
    ); 
}

type RowProps<Data> = {
    schema: Schema<Data>[]
    data: Data
}

function Row<Data>({ schema, data }: RowProps<Data>) {
    return (
        <tr>
            {schema.map(({ render, id }, index) => 
                <td key={id || index}>{render(data)}</td>)}
        </tr>
    );
}


function makeSchema<Data>(columns: ColumnElement<Data>[]): Schema<Data>[] {
    return Children.map(columns, column => {
        if (column && column.type === Column) {
            return { render: column.props.children, id: column.props.id }
        }
    }
        ).filter(c => c)
        
}