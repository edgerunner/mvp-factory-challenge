import DataBlock from "./DataBlock";

export default function DataSection({ children: columns, data, blockHeader }) {
    return (
        <section>
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