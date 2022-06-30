import { Menu } from "/src/components";
export default function ReportToolbar({ projects, gateways }) {
    return (
        <nav id="report-toolbar">
            <Menu title="All projects">
                <Menu.Item>All projects</Menu.Item>
                { projects.map(project => 
                    <Menu.Item key={project.id}>{project.name}</Menu.Item>)
                }
            </Menu>
            <Menu title="All gateways">
                <Menu.Item>All gateways</Menu.Item>
                { gateways.map(gateway =>
                    <Menu.Item key={gateway.id}>{gateway.name}</Menu.Item>)
                }
            </Menu>
        </nav>
    );
}