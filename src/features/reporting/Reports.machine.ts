import { createMachine, assign } from "xstate";
/* eslint indent: [error, 2] */

const API = "http://178.63.13.157:8090/mock-api/api";

interface Context {
  projects: {
    projectId: string,
    userIds: string[],
    rule: string,
    gatewayIds: string[],
    structure: string,
    industry: string,
    website: string,
    description: string,
    image: string,
    name: string
  }[],
  gateways: {
    gatewayId: string,
    userIds: string[],
    name: string,
    type: string,
    apiKey: string,
    secondaryApiKey: string,
    description: string
  }[],
  report: null | {
    paymentId: string,
    amount: number,
    projectId: string,
    gatewayId: string,
    userIds: string[],
    modified: string,
    created: string
  }[]
}

type Events =
  | { type: "userSubmittedReportRequest", filters: any }
  | { type: "userClickedRerty" } 
  | { type: "done.invoke.reportRequest", data: { data: Context["report"] } }
  | { type: "done.invoke.projectsRequest", data: { data: Context["projects"] } }
  | { type: "done.invoke.gatewaysRequest", data: { data: Context["gateways"] } }
  
  
export default 
/** @xstate-layout N4IgpgJg5mDOIC5QCUwAcD2AnALrAdADIYCGEAlgHZQAEYlO5jc+AClhgFZgDGeRpCtQDEEDJTD4qANwwBrSaky4CxMlVr1GzAuy69+aoVAQyMPEo3EBtAAwBdRKEywm5cU5AAPRAGYALLb4AKwAjABMwf4RAJwxobb+SQA0IACeiOEAbKH4-gDswQAcRcExvqG+MWH5AL61qUrYhoIadAxuLHrcfKqtImBYHFj4aAA2lgBm2AC2+E0qAurU7drkXRw9LcsmZhZWlHaOSCAubh4nPggAtOExWfi2WTH+RVlZVUXZRakZCKGlR7+YK+WzlHLhO6VeqNdDNPo7VadAgAcUsYAA7iQ0gjjKJxJIzAp8FB0VicagAI4AVzgOE8ZwOniuvnyQReWVsvl8wXyoX5-nCv0Q-hiQSStny4VF91C1XCMJAC22xiROnwaJwmOxuI0wkGw1GExw0ywc1JWvJsCptNg9JOjPclGZiGuoKC4SKopyXtKMXCtmCwoQUX8+DiOSyd2BAcSiuVupWWmR+Ik+Dt6PmcMWRjayZ0DIwriZl0Q+SK+XwWTZwWCWWCAficuDAWC4bKOT5EVCxSy-nj2f4AFEOjoaGNBJAs8ocDQ0PQ8WI00TFIOCCO1nBx5OINPmnOFxpTJRZPsnUdC8WnS6EC8ivhIaKClVOaEUuk-F8QiCkkUIvko3yOoGiVNd8A3ZFtzISBhGpWBBgAZWpAAjGYmC1CBlRtOlL3OZ1S1vXx72lflimBMV8iqYNQj5PIAjeEFAyeCoBxnAgAEFKDVNIaEmEhyDGSAaBwDAoIgWD4KwABhMZyB4BRMMGHA-mcIs8Jva5fzyCt7gAgEe0qfxqNse85QiL0xRiGs63qEDKAwCA4E8BMllVfN1l0TYDETKBcJLUArlue8iOrXx62iUU7khYNIgeQDAnuAo3hiUpWPhVy81HDy2C83pXMgPzrwIjt8CKHl-ByCJ6wbH4PwQT1ck7etIlsAMvmCNKc36TQso2fRekKi4AtdBt8BCyjwrff1-Wor0qyqBJeXiUo+SyTqVUyzdUTJHUMuoQb8OGm5wkrZ5FpOgMpWiSjgwqh4km5UJqyexIinWny1WyzVtRxfKIAOm8SrK2tWv8blW18YNgi5PI7lButygR969p6raNR2nEAYI64wireJAwuyUSPyFsXjyEGckDWJfAVECXNzJNevgB01P87xXQAsa3gmqIpqi6iIiraGilsOUeS9X9kYgscJ2g3cADlRKwNcsaO7twlK6tniauHar+JJKwbAoKOlHkailpmxKnZUD0oYxVfZ28KofJ4+zBlKeW5GKiPwUiUtsLl6z-QMLa2q3dxt2AAAsMAxQ7TlZoq1ble9pv9Tk+S5AIoZ9yLpT-Yp4k9UPINlxz-pZq8hsd+IwxInsvTKSUqLqis8gq4paySasXmRzjuN4-jBIgYTRLLh3AuBXxStZGm7neQIwSyFsqnbXl3ijOs7l8d6J9dApKzKyjIXuPsA-uai22BMrA3LQVqmrDrbKAA */
createMachine({
  context: { projects: [], gateways: [], report: null },
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
    projectsRequest: (): Promise<Context["projects"]> => fetch(API + "/projects").then(res => res.json()),
    gatewaysRequest: (): Promise<Context["gateways"]> => fetch(API + "/gateways").then(res => res.json()),
    reportRequest: (context, event): Promise<Context["report"]> =>
      event.type === "userSubmittedReportRequest" 
        ? fetch(API + "/report", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(event.filters),
        }).then(res => res.json())
        : Promise.reject(),
  },
  actions: {
    putProjectsIntoContext: putEntityInContext("projects"),
    putGatewaysIntoContext: putEntityInContext("gateways"),
    putReportIntoContext: putEntityInContext("report"),
  },
  guards: {
    emptyReport: (_, event) => 
      event.type === "done.invoke.reportRequest"
        && event.data.data.length === 0,
  }
});

function putEntityInContext(entity: keyof Context) {
  return assign({
    [entity]: (_, event) => event.data.data
  });
}