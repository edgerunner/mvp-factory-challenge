import DataBlock from "./DataBlock";
import "./DataSection.css";
import { useState } from "react";
import type { Column } from "./Table";

interface Props<Data> {
    children: ReturnType<typeof Column>[]
    data: (Data[] & { key?: any, id?: any })[]
    header?: React.ReactNode
    blockHeader?: (data: Data[]) => React.ReactNode
}


export default function DataSection<Data>({ 
    children: columns, data, header, blockHeader 
}: Props<Data>) {
    const [openBlock, setOpenBlock] = useState(0);
    return (
        <section>
            {header && <header>{header}</header>}
            {data.map((block, index) => 
                <DataBlock 
                    open={index === openBlock}
                    key={block.key || block.id || index}
                    onToggle={() => setOpenBlock(index)}
                    data={block}
                    header={blockHeader?.(block)}>
                    {columns}
                </DataBlock>)}
        </section>
    );
}