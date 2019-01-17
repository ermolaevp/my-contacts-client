import * as React from 'react'
import NotFound from '../../../pages/not-found'
import { cleanup } from 'react-testing-library'
import renderWithRedux from '../../../utils/render-with-redux'

afterEach(cleanup)

describe('Contacts page', () => {
  it('renders without crashing', async () => {
    renderWithRedux(<NotFound />)
  })
})
