import DataBlock from "./DataBlock";
import "./DataSection.css";
import { useState } from "react";

export default function DataSection({ children: columns, data, header, blockHeader }) {
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