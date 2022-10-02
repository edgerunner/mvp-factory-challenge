import { Button, Menu } from "src/components";
import type { Project, Gateway } from "./Reports.schema"
import { useState, useCallback } from "react";
import "./ReportToolbar.css";

const allProjects: Pick<Project, "projectId" | "name"> = { projectId: "", name: "All projects" };
const allGateways: Pick<Gateway, "gatewayId" | "name"> = { gatewayId: "", name: "All gateways" };

interface Props {
    projects: Project[]
    gateways: Gateway[]
    onSubmit: (parameters: {
        projectId?: string
        gatewayId?: string
    }) => void
}

export default function ReportToolbar({ projects, gateways, onSubmit }: Props) {
    const [project, setProject] = useState(allProjects);
    const [gateway, setGateway] = useState(allGateways);

    const findAndSetProject = useCallback((projectId: Project["projectId"]) =>
        setProject(
            projects.find(p => p.projectId === projectId) || allProjects
        ), [projects])

    const findAndSetGateway = useCallback((gatewayId: Gateway["gatewayId"]) =>
        setGateway(
            gateways.find(p => p.gatewayId === gatewayId) || allGateways
        ), [gateways])

    const submit = useCallback(() => {
        const parameters: Parameters<Props["onSubmit"]>[0] = {};
        if (project.projectId) parameters.projectId = project.projectId;
        if (gateway.gatewayId) parameters.gatewayId = gateway.gatewayId;
        onSubmit(parameters);
    }, [project, gateway, onSubmit]);

    return (
        <nav id="report-toolbar">
            <Menu onSelect={findAndSetProject} title={project.name}>
                { [allProjects, ...projects].map(project => 
                    <Menu.Item key={project.projectId} id={project.projectId}>
                        {project.name}
                    </Menu.Item>)
                }
            </Menu>
            <Menu onSelect={findAndSetGateway} title={gateway.name}>
                { [allGateways, ...gateways].map(gateway =>
                    <Menu.Item key={gateway.gatewayId} id={gateway.gatewayId}>
                        {gateway.name}
                    </Menu.Item>)
                }
            </Menu>
            <Button icon="calendar">From date</Button>
            <Button icon="calendar">To date</Button>
            <Button action onClick={submit}>
                Generate report
            </Button>
        </nav>
    );
}