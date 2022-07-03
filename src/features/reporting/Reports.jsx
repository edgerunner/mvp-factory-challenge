import "./Reports.css";
import ReportsHeader from "./ReportsHeader";
import ReportToolbar from "./ReportToolbar";
import { assign } from "xstate";
import { useMachine } from "@xstate/react";
import machine from "./Reports.machine";

export const API = "http://178.63.13.157:8090/mock-api/api";
export default function Reports() {
    const [state] = useMachine(machine, {
        services: {
            projectsRequest: () => fetch(API + "/projects").then(res => res.json()),
            gatewaysRequest: () => fetch(API + "/gateways").then(res => res.json()),
        },
        actions: {
            putProjectsIntoContext: putEntityInContext("project"),
            putGatewaysIntoContext: putEntityInContext("gateway"),
        }
    });
    return <main id="reports">
        <ReportsHeader>
            {mapState(state, [
                ["Loading entities", () => <div className="under-construction">Loading projects and gateways</div>],
                ["Entities loaded", () => <ReportToolbar
                    projects={state.context.projects}
                    gateways={state.context.gateways} />],
                ["An entity failed to load", () => <div className="under-construction">Error loading projects and gateways <button>Retry</button></div>]
            ])}
        </ReportsHeader>
        <Placeholder />
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