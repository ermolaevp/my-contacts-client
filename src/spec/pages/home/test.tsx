import * as React from 'react'
import Home from '../../../pages/home'
import { cleanup } from 'react-testing-library'
import renderWithRedux from '../../../utils/render-with-redux'

afterEach(cleanup)

describe('Contacts page', () => {
  it('renders without crashing', async () => {
    renderWithRedux(<Home />)
  })
})
