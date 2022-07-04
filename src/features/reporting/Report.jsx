import { DataSection, Date as Date_, Currency, Column } from "/src/components";

export default function Report({ report, projects, gateways }) {
    const resolved = resolve(report, projects, gateways);
    const partitioned = partition(resolved);
    const projectName = extract(resolved);
    return (
        <div id="report">
            <DataSection 
                data={partitioned}
                header={`${projectName} | All gateways`}
                blockHeader={block => block[0].project.name}>
                <Column header="Date">{row => <Date_ date={row.created}/>}</Column>
                <Column header="Gateway">{row => row.gateway.name}</Column>
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

function partition(data) {
    return [...data.reduce((map, block) =>
        map.set(block.projectId,
            [...(map.get(block.projectId) || []), block])
    , new Map()).values()];
}

function extract(data) {
    const basis = data[0].projectId;
    for (const block of data) {
        if (block.projectId !== basis) return "All projects";
    }
    return data[0].project.name;
}