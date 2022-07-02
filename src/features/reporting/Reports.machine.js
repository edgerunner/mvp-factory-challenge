import { createMachine } from "xstate";
/* eslint indent: [error, 2] */
export default 
/** @xstate-layout N4IgpgJg5mDOIC5QCUwAcD2AnALrAdADIYCGEAlgHZQAEYlO5jc+AClhgFZgDGeRpCtQDEEDJTD4qANwwBrSaky4CxMlVr1GzAuy69+aoVAQyMPEo3EBtAAwBdRKEywm5cU5AAPRAGYALLb4AKwAjABMwf4RAJwxobb+SQA0IACeiOEAbKH4-gDswQAcRcExvqG+MWH5AL61qUrYhoIadAxuLADilmAA7iRpqq0iYhJSlLIK+E0qAurU7drk3b0DQ-PGppPmlu6Udo5IIC5uHsc+CL6+Wfi+wcFZtvn+Afm+RVlZqRkI-jFBJLPLIxbK2Sq2KL1RroZrDBaaDo6UTiSSwHC9GawuZGNpaTrwY6nKyUTyXfJFfL4LL5SGPYLhWzxUIxH5+fzBfDVGI5fKhCKhYpZfzQkCzfgAUSRK1gNAANoJIFjlDgaGh6MYUeMzNNxQQpcs4PLFRBlc01RqNNtZBYSYdPMT9mTEHEgjFSuFCpESgz-GyrlkindfM8YhzHvkAeERQ0xdjJdKjQqyJBhABXWBgLAAZTTACMALZMHCQcWoACOabgOAdGFcJOdCB5vmpwuy1xifOy-sFuX8OXC4VCgaKoXeY-qscoGAgcE8es2eMTug43D48OMtfrTouiBB+CKTMD0ZpSSHfvSmX8Qc72X5wWub2uooXuMW+J0bFXBg3kC3Z1JXcEEeGI8iHIp4lsSl+35f1PX8PJhVCIobiyR5fGjYIX3jDcl0NFd9HXf8GyAjkDyPIoTxefxzwvX4x05d0xxZRJuWbbCVVw99l3wHoS3WLioGIndQEuNDqQZfJaWQ10kl8f0CipcoXh5b1rlHDi4UXbj8N4tZBl-CBhPOUTECFfBWIKT1D09VlL2A2wWxoqMORBe46ljV8RkRXS+P6AzjMA0y-lyNDPWkiCATkhTEi5fssmjcISh5SjNJxbylgJQLGzHCTwvBSLEleHtbHCLkASKAooNK8IeQ8mFOPwA0CWNFNTQAOQwGgsBw7KgISJl8FqyIpNK4VAiKf1ilAh4KQfSCwt8NKE3w1rZ1NcULUoTciTrADG07ULapU65hUhOjMmQ-BQho07oh5Zkls8nCmuXNalU22AAAsMD6IKTj2kjgriIMwVPD5qlHYIFLiLlbCgilkOuMoJ2exrmp0d6jN27cTO8F0qlbGisg7Ltvnsr48lpa5I2bcE0OWwlnEBkT8YQABaW43kHJj4eqYJ8n9TmQkZKIQIeEFPiwycgA */
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
  },
});