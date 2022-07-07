import Table from "./Table";
import "./DataBlock.css";
import cn from "classnames";

export default function DataBlock({ children: columns, data, header, open, onToggle }) {
    return (
        <article className={cn({open})}>
            {header && <header onClick={() => onToggle?.()}>{header}</header>}
            {open && <Table data={data}>{columns}</Table>}
        </article>
    );
}