import * as React from 'react'
import App from '../app'
import { cleanup } from 'react-testing-library'
import renderWithRedux from '../utils/render-with-redux'

afterEach(cleanup)

it('renders without crashing', () => {
  renderWithRedux(<App />)
})
