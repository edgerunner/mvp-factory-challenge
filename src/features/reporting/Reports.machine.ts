import { createMachine, assign } from "xstate";
import schema, { Project, Gateway, Payment } from "./Reports.schema"

/* eslint indent: [error, 2] */

const API = "http://178.63.13.157:8090/mock-api/api";

interface Context {
  projects: Project[],
  gateways: Gateway[],
  report: Payment[]
}

type Events =
  | { 
      type: "userSubmittedReportRequest",
      filters: { projectId?: string, gatewayId?: string } 
    }
  | { type: "userClickedRerty" } 
  | RequestDoneEvent
  
type RequestDoneEvent<Key extends keyof Context = keyof Context> = { 
  type: `done.invoke.${Key}Request`, 
  data: Context[Key] 
}

export default 
/** @xstate-layout N4IgpgJg5mDOIC5QCUwAcD2AnALrAdADIYCGEAlgHZQAEYlO5jc+AClhgFZgDGeRpCtQDEEDJTD4qANwwBrSWg7c+sVAEcArnByJQmWE3Li9IAB6IAzADYAjPhsBOAAwAWRwHZbH1wA5rlgA0IACeiABM1r741uGOlh6WAKy+4Za2UQC+mcGomLgExGRUtPSMzATsXLz8RUJQwmBYHFj4aAA2JDgAZtgAtm3KNWpgWjqmBkYmSOaIALRx1vjO1o6urkmWW86WrkGhEbau+EeOAeFHtlseHuHZuejYtYIldAxGLADiXWAA7iQhQovERiCRSSiyBT4KA-f6AjTaWC6GaTRjTUAWBAJZz4NbWHbJLy2I7hYJhBDuHHrZy3dxnWyOJJ3HIgPJPIHFahvcrkL6wgEc+qNZrYNqdHr9aH8+GjRHI-QYQxoyimTFzSzOHHhXzuOw63xJRzhZxJMmIJLrXH02JrJma1z3VmPAoCTmld4VUTiSRIn74NkuuqvMofeAoxVTFUzTEeXweGIeE1Jax2xzExxmrEbXGGuxEi4pawOlkB-gAUQ9vNgNHagkg-udOBoaHoQtBkhk8kkWEbCPG4aVxijGMQa0cJy2R18tl8-kcaczCSS+DScQu1js2ssjtLBArPLgNbrEGEmlgTQAypoAEZ9Jg4SClvtIiYR5Wq0eWaLhVzElIbFxEgzA4EG8ew9j8FMNSSFZ0h3RsCAAQUobkmBCGhuhIch2kgGgcAwI8yFPc8sAAYXacgeAUCBUFwckFUHdFZgQOZ1miPwPDODw9VsJIrlcTNbGcaIGVsbVKU8JNrGyFlKAwCA4FMXdXXqVCKjYIZVBUkpX0Y4dmIWaIv2sRIU1-dw11JEDwmTGJwh8ZwzlcWNVgNeD8meN01KrDTqi0upIF0yMPwQXN8F8ZJXDsMSUyZXxM21ew8xTGznGNVIknc9ltK5EN1KqFQ8CC99o3mJkHH8UyLVONdBJ1GJLDTE1OJnJJbiywNgXdA8CG+B84UFHSB2C0qWPsmImqZW4aR-bx9nJKKlnWScTIyNxfA6zzVLyny+r+AUVMC4aSpHUKznC5IYJ-LZdk2TMYMsfBXDiNKNlWZJVk2wbcsrPl+oFYqhxCuY+ImoSpuNWlvEXNYnqSGC7BNMT4mZB4PO+7rQ0Bpi1W4iqTJsaqLKNQSxJiGDfGcBlkh1DZbC+-B91DQiFIgfAADkCJ7dHsf0zExLJyrVmSl74pA9Z4yZZzAOu+HvAZpmKhZ+tS2bVshoYkbTrxFcViLPZHAizZ5oiL8Tl4w3NUJ6cTQV37q1rMgVcbGhYAACwwX59NRIHRvTaIjXnSIaSErYBJAzZ2KNH9pxSNNtTtnrlYgXmQrTY5Zt4nVDRpRrMzjJ6opSeH1hMtYGeQtT0Mw7DcPwlnU9G1jNguxJwkWItNTORdGpzNqN1iZM4m3EsEMb07WJuVvLHbs5O8c6xBOXDYIuanU4mTDxMpkoA */
createMachine<Context, Events>({
  context: { projects: [], gateways: [], report: [] },
  schema: { context: {} as Context, events: {} as Events },
  id: "Reports",
  initial: "Loading entities",
  states: {
    "Loading entities": {
      type: "parallel",
      states: {
        Projects: {
          initial: "Loading",
          states: {
            Loading: {
              invoke: {
                src: "projectsRequest",
                id: "projectsRequest",
                onDone: [
                  {
                    actions: "putProjectsIntoContext",
                    target: "Loaded",
                  },
                ],
                onError: [
                  {
                    target: "#Reports.An entity failed to load",
                  },
                ],
              },
            },
            Loaded: {
              type: "final",
            },
          },
        },
        Gateways: {
          initial: "Loading",
          states: {
            Loading: {
              invoke: {
                src: "gatewaysRequest",
                id: "gatewaysRequest",
                onDone: [
                  {
                    actions: "putGatewaysIntoContext",
                    target: "Loaded",
                  },
                ],
                onError: [
                  {
                    target: "#Reports.An entity failed to load",
                  },
                ],
              },
            },
            Loaded: {
              type: "final",
            },
          },
        },
      },
      onDone: {
        target: "Entities loaded",
      },
    },
    "Entities loaded": {
      initial: "No reports",
      states: {
        "No reports": {},
        "Report pending": {
          invoke: {
            src: "reportRequest",
            id: "reportRequest",
            onDone: [
              {
                actions: "putReportIntoContext",
                cond: "emptyReport",
                target: "No reports",
              },
              {
                actions: "putReportIntoContext",
                target: "Report shown",
              },
            ],
          },
        },
        "Report shown": {},
      },
      on: {
        userSubmittedReportRequest: {
          target: ".Report pending",
        },
      },
    },
    "An entity failed to load": {
      on: {
        userClickedRerty: {
          target: "Loading entities",
        },
      },
    },
  },
}, {
  services: {
    projectsRequest: (): Promise<Context["projects"]> => 
      fetch(API + "/projects")
        .then(res => res.json())
        .then(schema.projects.parse),
    gatewaysRequest: (): Promise<Context["gateways"]> => 
      fetch(API + "/gateways")
        .then(res => res.json())
        .then(schema.gateways.parse),
    reportRequest: (_, event): Promise<Context["report"]> =>
      event.type === "userSubmittedReportRequest" 
        ? fetch(API + "/report", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(event.filters),
        }).then(res => res.json())
          .then(json => schema.report.parse(json))
        : Promise.reject(),
  },
  actions: {
    putProjectsIntoContext: assign({ 
      projects: (context, event) => 
        event.type === "done.invoke.projectsRequest" 
        && event.data as Project[]
        || context.projects
    }),
    putGatewaysIntoContext: assign({ 
      gateways: (context, event) => 
        event.type === "done.invoke.gatewaysRequest" 
        && event.data as Gateway[]
        || context.gateways
    }),
    putReportIntoContext: assign({ 
      report: (context, event) => 
        event.type === "done.invoke.reportRequest" 
        && event.data as Payment[]
        || context.report
    }),
  },
  guards: {
    emptyReport: (_, event) => 
      event.type === "done.invoke.reportRequest"
        && event.data.length === 0,
  }
});