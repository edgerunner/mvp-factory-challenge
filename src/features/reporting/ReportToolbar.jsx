import { Button, Menu } from "/src/components";
import { useState, useCallback } from "react";
import "./ReportToolbar.css";

const allProjects = { projectId: null, name: "All projects", key: null };
const allGateways = { gatewayId: null, name: "All gateways", key: null };

export default function ReportToolbar({ projects, gateways, onSubmit }) {
    const [project, setProject] = useState(allProjects);
    const [gateway, setGateway] = useState(allGateways);

    const submit = useCallback(() => {
        const parameters = {};
        if (project.projectId) parameters.projectId = project.projectId;
        if (gateway.gatewayId) parameters.gatewayId = gateway.gatewayId;
        onSubmit(parameters);
    }, [project, gateway, onSubmit]);

    return (
        <nav id="report-toolbar">
            <Menu onSelect={p => setProject(p)} title={project.name}>
                { [allProjects, ...projects].map(project => 
                    <Menu.Item key={project.projectId} id={project}>
                        {project.name}
                    </Menu.Item>)
                }
            </Menu>
            <Menu onSelect={g => setGateway(g)} title={gateway.name}>
                { [allGateways, ...gateways].map(gateway =>
                    <Menu.Item key={gateway.gatewayId} id={gateway}>
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