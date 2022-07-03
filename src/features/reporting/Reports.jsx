import "./Reports.css";
import ReportsHeader from "./ReportsHeader";
import ReportToolbar from "./ReportToolbar";
import { assign } from "xstate";
import { useMachine } from "@xstate/react";
import machine from "./Reports.machine";

export const API = "http://178.63.13.157:8090/mock-api/api";
export default function Reports() {
    const [state, send] = useMachine(machine, {
        services: {
            projectsRequest: () => fetch(API + "/projects").then(res => res.json()),
            gatewaysRequest: () => fetch(API + "/gateways").then(res => res.json()),
            reportRequest: (context, event) => fetch(API + "/report", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(event.filters),
            }).then(res => res.json()),
        },
        actions: {
            putProjectsIntoContext: putEntityInContext("project"),
            putGatewaysIntoContext: putEntityInContext("gateway"),
            putReportIntoContext: () => assign({
                report: (_, event) => event.data.data,
            }),
        },
        guards: {
            emptyReport: (_, event) => event.data.data.length === 0,
        }
    });
    return <main id="reports">
        <ReportsHeader>
            {mapState(state, [
                ["Loading entities", () => <div className="under-construction">Loading projects and gateways</div>],
                ["Entities loaded", () => <ReportToolbar
                    projects={state.context.projects}
                    gateways={state.context.gateways} 
                    onSubmit={filters => send({ type: "userSubmittedReportRequest", filters })}/>],
                ["An entity failed to load", () => <div className="under-construction">Error loading projects and gateways <button>Retry</button></div>]
            ])}
        </ReportsHeader>
        {mapState(state, [
            ["Loading entities", () => <Placeholder />],
            ["An entity failed to load", () => <Placeholder />],
            [{"Entities loaded": "No reports"}, () => <Placeholder />],
            [{"Entities loaded": "Report pending"}, () => <div className="under-construction">Loading report</div>],
            [{"Entities loaded": "Report shown"}, () => <section id="report" className="under-construction">Report loaded</section>],
        ])}
    </main>;
}

function Placeholder() {
    return (
        <div id="reports-placeholder">
            <hgroup>
                <h1>No reports</h1>
                <h5>
                    Currently you have no data for the reports to be generated.
                    Once you start generating traffic through the Balance 
                    application the reports will be shown.
                </h5>
            </hgroup>
        </div>
    );
}

function putEntityInContext(entity) {
    return assign({
        [`${entity}s`]: (_, event) => event.data.data.map(e => ({ id: e[`${entity}Id`], name: e.name })),
    });
}

function mapState(state, mappings, defaultValue = null) {
    for (const [matcher, mapping] of mappings) {
        if (state.matches(matcher)) {
            return mapping();
        }
    }
    return defaultValue;
}