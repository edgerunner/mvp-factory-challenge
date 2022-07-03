import DataBlock from "./DataBlock";
import "./DataSection.css";

export default function DataSection({ children: columns, data, header, blockHeader }) {
    return (
        <section>
            {header && <header>{header}</header>}
            {data.map((block, index) => 
                <DataBlock 
                    open
                    key={block.key || block.id || index}
                    data={block}
                    header={blockHeader?.(block)}>
                    {columns}
                </DataBlock>)}
        </section>
    );
}