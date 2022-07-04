import { useMemo } from "react";
import { DataSection, Date as Date_, Currency, Column } from "/src/components";

export default function Report(props) {
    const { mode, data, names, renderHeader } = useTransform(props);

    return (
        <div id="report">
            <DataSection 
                data={data}
                header={`${names.project} | ${names.gateway}`}
                blockHeader={renderHeader}>
                <Column header="Date">{row => <Date_ date={row.created}/>}</Column>
                {mode === "all" && <Column header="Gateway">{row => row.gateway.name}</Column>}
                <Column header="Transaction ID">{row => row.paymentId}</Column>
                <Column header="Amount">
                    {row => <Currency amount={row.amount} code="USD"/>}
                </Column>
            </DataSection>
        </div>
    );
}   

function useTransform({ report, projects, gateways }) {
    return useMemo(() => {
        projects = projects.reduce((map, project) =>
            map.set(project.projectId, { ...project, blocks: [] }),
        new Map());
        gateways = gateways.reduce((map, gateway) =>
            map.set(gateway.gatewayId, { ...gateway, blocks: [] }),
        new Map());

        for (const block of report) {
            block.project = projects.get(block.projectId);
            block.gateway = gateways.get(block.gatewayId);
            block.created = new Date(block.created);
            block.modified = new Date(block.modified);

            block.project.blocks.push(block);
            block.gateway.blocks.push(block);
        }

        for (const project of projects.values())
            if (!project.blocks.length) 
                projects.delete(project.projectId);
        for (const gateway of gateways.values())
            if (!gateway.blocks.length)
                gateways.delete(gateway.gatewayId);

        const mode =
            projects.size > 1 && gateways.size > 1 && "all" ||
            projects.size === 1 && gateways.size > 1 && "project" ||
            projects.size > 1 && gateways.size === 1 && "gateway" ||
            projects.size === 1 && gateways.size === 1 && "single";

        const data = {
            all: [...projects.values()].map(project => project.blocks),
            project: [...gateways.values()].map(gateway => gateway.blocks),
            gateway: [...projects.values()].map(project => project.blocks),
            single: [projects.values().next().value.blocks]
        }[mode];

        const names = {
            all: { project: "All projects", gateway: "All gateways" },
            project: { project: projects.values().next().value.name, gateway: "All gateways" },
            gateway: { project: "All projects", gateway: gateways.values().next().value.name },
            single: { 
                project: projects.values().next().value.name,
                gateway: gateways.values().next().value.name
            }
        }[mode];

        const renderHeader = {
            all: rows => rows.values().next().value.project.name,
            project: rows => rows.values().next().value.gateway.name,
            gateway: rows => rows.values().next().value.project.name,
            single: () => null
        }[mode];

        return { mode, data, names, renderHeader };

    }, [report, projects, gateways]);
}