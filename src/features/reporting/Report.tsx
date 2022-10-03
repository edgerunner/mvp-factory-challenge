import { useMemo } from "react";
import { DataSection, Date as Date_, Currency, Column, Summary } from "src/components";
import PercentagePieChart from "./PercentagePieChart";
import type { Project, Gateway, Payment } from "./Reports.schema"
import "./Report.css";
import * as React from "react";

interface Props {
    projects: Project[]
    gateways: Gateway[]
    report: Payment[]
}

type Mode = "all" | "project" | "gateway" | "single"

interface TransformedProps {
    mode: Mode
    names: { project: string, gateway: string }

    total: number
    totalTitle: string

    chart: ((Project|Gateway) & ScopeExtension)[] | null

    data: (Payment & PaymentExtension)[][]

    renderHeader: (rows: PaymentExtension[]) => React.ReactNode
}

interface ScopeExtension {
    total: number
    blocks: (Payment & PaymentExtension)[]
}

interface PaymentExtension {
    project: Project & ScopeExtension
    gateway: Gateway & ScopeExtension
}

const PaymentColumn = Column<Payment & PaymentExtension>

export default function Report(props: Props) {
    const {
        mode,
        data,
        names,
        renderHeader,
        total,
        totalTitle,
        chart
    } = useTransform(props);

    return (
        <div id="report" className={mode || ""}>
            <DataSection 
                data={data}
                header={`${names.project} | ${names.gateway}`}
                blockHeader={renderHeader}>
                <PaymentColumn header="Date">{row => <Date_ date={row.created}/>}</PaymentColumn>
                {mode === "all" ? <PaymentColumn header="Gateway">{row => row.gateway.name}</PaymentColumn> : <></>}
                <PaymentColumn header="Transaction ID">{row => row.paymentId}</PaymentColumn>
                <PaymentColumn header="Amount">
                    {row => <Currency amount={row.amount} code="USD"/>}
                </PaymentColumn>
            </DataSection>
            { chart && <div className="chart"><PercentagePieChart data={chart}/></div> }
            <Summary>
                {totalTitle} | <Currency amount={total} code="USD"/>
            </Summary>
        </div>
    );
}   

function useTransform({ 
    report: paymentArray, 
    projects: projectArray, 
    gateways: gatewayArray 
}: Props): TransformedProps {
    return useMemo(() => {
        const projects: Map<string, Project & ScopeExtension> = projectArray.reduce((map, project) =>
            map.set(project.projectId, { ...project, total: 0, blocks: [] }),
        new Map());
        const gateways: Map<string, Gateway & ScopeExtension> = gatewayArray.reduce((map, gateway) =>
            map.set(gateway.gatewayId, { ...gateway, total: 0, blocks: [] }),
        new Map());

        const report: (Payment)[] = [...paymentArray].sort((a, b) => a.created.valueOf() - b.created.valueOf());

        let total = 0;
        const noProject = { projectId: "", name: "No project", total: 0, blocks: [] };
        const noGateway = { gatewayId: "", name: "No gateway", total: 0, blocks: [] };

        for (const rawBlock of report) {
            const block = rawBlock as Payment & PaymentExtension
            block.project = projects.get(block.projectId) || noProject;
            block.gateway = gateways.get(block.gatewayId) || noGateway;

            block.project?.blocks.push(block);
            block.gateway?.blocks.push(block);

            total += block.amount;
            block.gateway.total += block.amount;
            block.project.total += block.amount;
        }

        projects.set("", noProject);
        gateways.set("", noGateway);

        for (const project of projects.values())
            if (!project.blocks.length) 
                projects.delete(project.projectId);
        for (const gateway of gateways.values())
            if (!gateway.blocks.length)
                gateways.delete(gateway.gatewayId);

        const mode: Mode =
            projects.size > 1 && gateways.size > 1 && "all" ||
            projects.size === 1 && gateways.size > 1 && "project" ||
            projects.size > 1 && gateways.size === 1 && "gateway" ||
            projects.size === 1 && gateways.size === 1 && "single" ||
            "all";

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
            all: (rows: PaymentExtension[]) => rows.values().next().value.project.name,
            project: (rows: PaymentExtension[]) => rows.values().next().value.gateway.name,
            gateway: (rows: PaymentExtension[]) => rows.values().next().value.project.name,
            single: () => null
        }[mode];

        const totalTitle = {
            all: "Total",
            project: "Project total",
            gateway: "Gateway total",
            single: "Total"
        }[mode];

        const chart = {
            all: null,
            project: [...gateways.values()],
            gateway: [...projects.values()],
            single: null,
        }[mode];

        return { mode, data, names, renderHeader, total, totalTitle, chart };

    }, [paymentArray, projectArray, gatewayArray]);
}