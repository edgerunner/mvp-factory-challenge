import { DataSection, Date as Date_, Currency, Column } from "/src/components";

export default function Report({ report, projects, gateways }) {
    projects = projects.reduce((map, project) =>
        map.set(project.projectId, project), new Map());
    gateways = gateways.reduce((map, gateway) =>
        map.set(gateway.gatewayId, gateway), new Map());

    const resolved = resolve(report, projects, gateways);
    const [projectId, gatewayId] = extract(resolved);
    const projectName = projectId ? resolved[0].project.name : "All projects";
    const gatewayName = gatewayId ? resolved[0].gateway.name : "All gateways";
    
    const partitionBy = projectId && !gatewayId ? "gateway" : "project";
    const partitioned = partition(resolved, partitionBy, {projects, gateways});

    const blockHeader = block => projectId && gatewayId
        ? null
        : block[0][partitionBy].name;

    return (
        <div id="report">
            <DataSection 
                data={partitioned}
                header={`${projectName} | ${gatewayName}`}
                blockHeader={blockHeader}>
                <Column header="Date">{row => <Date_ date={row.created}/>}</Column>
                {partitionBy === "project" && !gatewayId
                    ? <Column header="Gateway">{row => row.gateway.name}</Column>
                    : null}
                <Column header="Amount">
                    {row => <Currency amount={row.amount} code="USD"/>}
                </Column>
            </DataSection>
        </div>
    );
}   

function resolve(rawData, projects, gateways) {
    return rawData.map(block => ({
        ...block,
        project: projects.get(block.projectId),
        gateway: gateways.get(block.gatewayId),
        created: new Date(block.created),
        modified: new Date(block.modified)
    }));
}

function partition(data, partitionBy, entities) {
    return [...data.reduce((map, block) =>
        map.set(block[partitionBy],
            [...(map.get(block[partitionBy]) || []), block])
    , new Map(
        Array.from(entities[`${partitionBy}s`].values())
            .map(entity => [entity, []])
    )).values()
    ];
}

function extract(data) {
    let projectId = data[0].projectId;
    let gatewayId = data[0].gatewayId;
    for (const block of data) {
        if (block.projectId !== projectId) projectId = false;
        if (block.gatewayId !== gatewayId) gatewayId = false;
    }
    return [ projectId, gatewayId ];
}