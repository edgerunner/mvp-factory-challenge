import { Button, Menu } from "/src/components";
import { useState, useCallback } from "react";

const allProjects = { id: null, name: "All projects" };
const allGateways = { id: null, name: "All gateways" };

export default function ReportToolbar({ projects, gateways, onSubmit }) {
    const [project, setProject] = useState(allProjects);
    const [gateway, setGateway] = useState(allGateways);

    const submit = useCallback(() => {
        const parameters = {};
        if (project.id) parameters.project = project.id;
        if (gateway.id) parameters.gateway = gateway.id;
        onSubmit(parameters);
    }, [project, gateway, onSubmit]);

    return (
        <nav id="report-toolbar">
            <Menu onSelect={p => setProject(p)} title={project.name}>
                { projects.map(project => 
                    <Menu.Item key={project.id} id={project}>
                        {project.name}
                    </Menu.Item>)
                }
            </Menu>
            <Menu onSelect={g => setGateway(g)} title={gateway.name}>
                { gateways.map(gateway =>
                    <Menu.Item key={gateway.id} id={gateway}>
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