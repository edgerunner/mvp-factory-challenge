import { DataSection, Date as Date_, Currency, Column } from "/src/components";

export default function Report({ report, projects, gateways }) {
    const resolved = resolve(report, projects, gateways);
    const [projectId, gatewayId] = extract(resolved);
    const projectName = projectId ? resolved[0].project.name : "All projects";
    const gatewayName = gatewayId ? resolved[0].gateway.name : "All gateways";
    
    const partitionBy = projectId && !gatewayId ? "gateway" : "project";
    const partitioned = partition(resolved, partitionBy);

    return (
        <div id="report">
            <DataSection 
                data={partitioned}
                header={`${projectName} | ${gatewayName}`}
                blockHeader={block => block[0][partitionBy].name}>
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

function resolve(rawData, projectsArray, gatewaysArray) {
    const projects = projectsArray.reduce((map, project) =>
        ({ ...map, [project.projectId]: project}), {});
    const gateways = gatewaysArray.reduce((map, gateway) =>
        ({ ...map, [gateway.gatewayId]: gateway}), {});
    return rawData.map(block => ({
        ...block,
        project: projects[block.projectId],
        gateway: gateways[block.gatewayId],
        created: new Date(block.created),
        modified: new Date(block.modified)
    }));
}

function partition(data, partitionBy) {
    return [...data.reduce((map, block) =>
        map.set(block[partitionBy],
            [...(map.get(block[partitionBy]) || []), block])
    , new Map()).values()];
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