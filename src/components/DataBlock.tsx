import Table from "./Table";
import type { Column } from "./Table";
import "./DataBlock.css";
import cn from "classnames";

interface Props<Data>{
    children: ReturnType<typeof Column>[]
    data: Data[]
    header?: React.ReactNode
    open?: boolean
    onToggle?: () => void 
}

export default function DataBlock<Data>({ children: columns, data, header, open, onToggle }: Props<Data>) {
    return (
        <article className={cn({open})}>
            {header && <header onClick={() => onToggle?.()}>{header}</header>}
            {open && <Table data={data}>{columns}</Table>}
        </article>
    );
}