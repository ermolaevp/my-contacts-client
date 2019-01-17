import * as React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-testing-library'
import mockApiClient from './mock-api-client'
import configureStore from '../redux/configureStore'
import { MemoryRouter } from 'react-router'

const store = configureStore({ apiClient: mockApiClient })

const renderWithRedux = (ui: any) => {
  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>,
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

export default renderWithRedux
