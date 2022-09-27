import { mount } from 'cypress/react'

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      mount: typeof mount
    }
  }
}