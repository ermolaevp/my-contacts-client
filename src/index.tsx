import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import { readCookie } from './utils/manage-cookies'
import { sessionAuthorize, sessionLogout } from './redux/actions/session'
import ApiClient from './utils/api-client'
import { TOKEN_COOKIE_NAME } from './constants'

const token = readCookie(TOKEN_COOKIE_NAME) || undefined
const { openApiSpec: spec = {} }: any = window

const apiClient = new ApiClient(spec, token)
const store = configureStore({ apiClient })

if (token) {
  store.dispatch(sessionAuthorize(token))
} else {
  store.dispatch(sessionLogout())
}

ReactDOM.render(
  <Provider store={store}>
    <App apiClient={apiClient} />
  </Provider>,
  document.getElementById('root'),
)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister()
  })
}
