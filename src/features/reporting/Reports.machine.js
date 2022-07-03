import { createMachine } from "xstate";
/* eslint indent: [error, 2] */
export default 
/** @xstate-layout N4IgpgJg5mDOIC5QCUwAcD2AnALrAdADIYCGEAlgHZQAEYlO5jc+AClhgFZgDGeRpCtQDEEDJTD4qANwwBrSaky4CxMlVr1GzAuy69+aoVAQyMPEo3EBtAAwBdRKEywm5cU5AAPRAGYALLb4AKwAjABMwf4RAJwxobb+SQA0IACeiOEAbKH4-gDswQAcRcExvqG+MWH5AL61qUrYhoIadAxuLHrcfKqtImBYHFj4aAA2lgBm2AC2+E0qAurU7drkXRw9LcsmZhZWlHaOSCAubh4nPggAtP6++fjh+f5F4TG28YFFqRkI4UVBGJZIoJAHxYqJLL1RroZp9HarToEADiljAAHcSGl4cZROJJGYFPNYYsjG0tEj8KicBisTiNKZKLJ9u5Dg5PGcDp4rr5fFl8L5gsEsrZngF8r4ilksj9EP53nlAvksjFsrZKrYotCQAttsZEToqWjMdilrjBsNRhMcNMsHNdfSVhTDdTaaaydRGczLKyjhyMK4uZdELdonkKoUIrynuFwrKEMEPvhym9pcrgvl3r5tQ6zeSOjo8RJ8LAcGjico9fm1nB-YHWdzEPkig8svlNcLguEPqFQjF4wFgsmyjl8r3wqFill-DmSfwAKIF9awGhjQSQCvNGhoei4sTFwmKOcERc1ldrsgb3Xb3cMvY+mzsk6chvBhAxF6PcLygpVEWhFJ0j8V4QmCAIXgiZUnjqBodWPfBTyRVd1wgYQAFdYEGABlNCACMZiYGkIF1VAAEc0LgHA63OShG3fSVHmiScin8MpRSqeNQjHcMXiyMDNVsLIKlnSsCAAQUoA00hoSYSHIMZIBoHAMGQsh0MwrAAGExnIHgFGIsAcCwX5nADGi6OuUISnwHsomKaJqkEuMgIQAJ+VYoEhLiQJbCeepYMoDAIFrE5cw9TQlw2fRejzahqKDUArhVfAwWnCpY1eEUZRc78imTfJsiFUI2xKUURLhWKIrPNhNgMHFIHi19EsQYUYjyCciniWwW38HJQnjJ5-DyacrL5PihO-YJytJfoqspbo6sai5moQViUo+NKIn+NVst+LihxiEFmwqQ6wlFKbYLC2aDWXI0aRNR0oCW2i3z4-A+Og9VOveJJfHjAoHnKZ4gUiIpeRBaaqydSKUWNOkzQa58zIS7wWqlGyfwK5tfMzeNE18dr3kmlVBRgmFRMqm6WFdB7nrosMPvydsrLiRI7n+xJk16rJv3+TrgS4yHHqp+AkfrZbUYQLj3q7JmvtZ37ON85N3niLbPm68IhYQmHVOCiB8AAORUrBjzpt8IgiFK2xVUcefeb4XKSB4uwKd4CruIqybginEJ0PWrznG9KGMc2Vo-flu2lX7DsFXkBoY3sygBWw+WKBILvJiq-eXAODevWAAAsMHRF7TPFsvJd7Q7kzeVURTHVOAjxhj5VjCDinif5tZzuA87DyXPkYpOWLYiV+xc9GY4K15KknJJtYkqSZLkhSICUlSLwgAerluMCUvuXxY08nygQHKphwzaUeeFN5s0us2xfMt9biZg+JWP6PbA2ziCdY3xuo5EOiCUoM5-JAA */
createMachine({
  context: { projects: [], gateways: [], report: null },
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
        userClickedRetry: {
          target: "Loading entities",
        },
      },
    },
  },
});