import { Button, Menu } from "/src/components";
import { useState, useCallback } from "react";
export default function ReportToolbar({ projects, gateways, onSubmit }) {
    const [project, setProject] = useState(null);
    const [gateway, setGateway] = useState(null);

    const submit = useCallback(() => {
        const parameters = {};
        if (project) parameters.project = project;
        if (gateway) parameters.gateway = gateway;
        onSubmit(parameters);
    }, [project, gateway, onSubmit]);

    return (
        <nav id="report-toolbar">
            <Menu onSelect={p => setProject(p)} title="All projects">
                <Menu.Item id={null}>All projects</Menu.Item>
                { projects.map(project => 
                    <Menu.Item key={project.id} id={project.id}>
                        {project.name}
                    </Menu.Item>)
                }
            </Menu>
            <Menu onSelect={g => setGateway(g)} title="All gateways">
                <Menu.Item id={null}>All gateways</Menu.Item>
                { gateways.map(gateway =>
                    <Menu.Item key={gateway.id} id={gateway.id}>
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