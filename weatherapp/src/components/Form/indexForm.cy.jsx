import React from 'react'
import Form from './index'

describe('<Form />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Form />)
  })
})