import { DataBlock, Date as Date_, Currency, Column } from "/src/components";

export default function Report({ report, projects, gateways }) {
    const resolved = resolve(report, projects, gateways);
    return (
        <div id="report">
            <DataBlock open data={resolved} header="Report" >
                <Column header="Date">{row => <Date_ date={row.created}/>}</Column>
                <Column header="Project">{row => row.project.name}</Column>
                <Column header="Gateway">{row => row.gateway.name}</Column>
                <Column header="Amount">
                    {row => <Currency amount={row.amount} code="USD"/>}
                </Column>
            </DataBlock>
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