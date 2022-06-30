import { Menu } from "/src/components";
export default function ReportToolbar({ projects }) {
    return (
        <nav id="report-toolbar">
            <Menu title="All projects">
                <Menu.Item>All projects</Menu.Item>
                { projects.map(project => 
                    <Menu.Item key={project.id}>{project.name}</Menu.Item>)
                }
            </Menu>
        </nav>
    );
}