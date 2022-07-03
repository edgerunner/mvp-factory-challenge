import { createMachine } from "xstate";
/* eslint indent: [error, 2] */
export default 
/** @xstate-layout N4IgpgJg5mDOIC5QCUwAcD2AnALrAdADIYCGEAlgHZQAEYlO5jc+AClhgFZgDGeRpCtQDEEDJTD4qANwwBrSaky4CxMlVr1GzAuy69+aoVAQyMPEo3EBtAAwBdRKEywm5cU5AAPRAGYALLb4AKwAjABMwf4RAJwxobb+SQA0IACeiOEAbKH4-gDswQAcRcExvqG+MWH5AL61qUrYhoIadAxuLHrcfKqtImBYHFj4aAA2lgBm2AC2+E0qAurU7drkXRw9LcsmZhZWlHaOSCAubh4nPggAtP6++fjh+f5F4TG28YFFqRkI4UVBGJZIoJAHxYqJLL1RroZp9HarToEADiljAAHcSGl4cZROJJGYFPNYYsjG0tEj8KicBisTiNKZKLJ9u5Dg5PGcDp4rr5fFl8L5gsEsrZngF8r4ilksj9EP53nlAvksjFsrZKrYotCQAttsZEToqWjMdilrjBsNRhMcNMsHNdfSVhTDdTaaaydRGczLKyjhyMK4uZdELdonkKoUIrynuFwrKEMEPvhym9pcrgvl3r5tQ6zeSOjo8RJ8LAcGjico9fm1nB-YHWdzEPkig8svlNcLguEPqFQjF4wFgsmyjl8r3wqFill-DmSfwAKIF9awGhjQSQCvNGhoei4sTFwmKOcERc1ldrsgb3Xb3cMvY+mzsk6chvBhBxQGlJ5d4pf-wD4EBV8UUYn8IU23ecIZwaHVj3wU8kVXdcIGEABXWBBgAZVQgAjGYmBpCBdVQABHVC4BwOtzkoRt3yyXx8Glfxsl5GIx2yeNJ1yfwcljUJgRBCVQjqGDcwAQUoA00hoSYSHIMZIBoHAMCQsg0IwrAAGExnIHgFCIsAcCwX5nADajaOuUISnwHsomKaJqlsLI43SPweLyEd6LiQJbCeeoYMoDAIFrE5cw9TQlw2fRejzagqKDUArhVfAwWnCpY1eEUZVcv4XmTfJsiFfjmwBESYUrR0IrPNhNgMHFIHi19EsQYUYjyCciniWwWx43t4yefw8mnKy+SyYVfCg4JZwq2Kqspbo6sai5moQMCUo+NKIn+NVst+YShxiQTnOBaJeVsbNRLg8KDWXI0aRNSqlpot8xsYrt8nbKyPySXx4wKB5ymeIFIiKXkQWmuFZpulhXQes0GufMyEu8FqpRs+UCieAEnn7HLEwY5jILAlVBTK2CZuu51bthukntosMxqeT7OveH6-sSZMeOc5iSiBQSIdJfo5p0Om32Et6mfVFnEjuTjfOTd5OtFUICno0UBYXSLz2Q-AADkVKwY9RZWhIkzeSIPt86cvnjYo2qFZtgiqBJGYu8rIYQnRVOCiBN1wG9KGMY2UffMdGLeIHeWnTV-xyjr8BV8Io4clVezd8mPa172rznGhYAACwwdFntM+tlpDuIikeLKxU64pJz+uJk1sbrmxGwV4jJ3NPeXbOIGDq5yjapiWKqdjdsQaU8nbCbVRlyIXg1ggJKkmS5IUiAlJUi9+8RsuS5D24nZS+4JtTaONoHKphwzaVnOFN504dAeQ3+k+JVjIEL6BeNrn5LsOxJB6jxXyIl6hAA */
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