# MVP Factory challenge

This is a challenge app for the [MVP Factory frontend challenge #3](https://mvpmatch.notion.site/Main-Frontend-3-our-Mock-API-6088e94b83cd4ebba7d2bd883d5d710b)

## Stack

I prefer to have lean stacks and as few dependencies as possible

- [React](https://reactjs.org) for FRP rendering
- [XState](https://xstate.js.org) for state and effect management
- [Recharts](https://recharts.org) for data visualization
- [Zod](https://zod.dev) for parsing API data
- [Vite](https://vitejs.dev) as the bundler
- [Yarn](https://yarnpkg.com) as the package manager
- [Cypress](https://cypress.io) for testing

To run the app, first install dependencies with `yarn`, and run `yarn dev` 
to start the development server locally. Or start Cypress and explore the component tests with with `yarn cypress:ct` or end-to-end tests with `yarn cypress:e2e`.

On a side note, I took this as a personal challenge/opportunity to try Cypress'
new component testing feature for the first time. I think that approach has 
potential. Let me know what you think.

[Mert](mailto:mert@merttorun.com) ([@edgerunner](https://github.com/edgerunner))