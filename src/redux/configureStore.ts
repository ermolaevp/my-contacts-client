import { compose, createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import createReduxPromiseListener from 'redux-promise-listener'
import rootEpic from './epics'
import rootReducer from './reducers'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reduxPromiseListener = createReduxPromiseListener()

export const promiseListener = reduxPromiseListener

export default function configureStore(dependencies: object) {
  const epicMiddleware = createEpicMiddleware({
    dependencies,
  })

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware, reduxPromiseListener.middleware),
    ),
  )

  epicMiddleware.run(rootEpic)

  return store
}
