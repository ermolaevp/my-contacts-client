import { assert } from 'chai'
import $$observable from 'symbol-observable'
import { TestScheduler } from 'rxjs/testing'
import { cleanup } from 'react-testing-library'
import { SESSION_AUTHORIZE } from '../../../redux/actions/session'
import { USER_FETCH, USER_CLEAR } from '../../../redux/actions/user'
import {
  sessionLoginEpic,
  sessionAuthorizeEpic,
  sessionLogoutEpic,
} from '../../../redux/epics/session'
import {
  sessionLogin,
  sessionAuthorize,
  sessionLogout,
} from '../../../redux/actions/session'

import configureStore from '../../../redux/configureStore'

let store: any
let state$: any

const sessionToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxODE2MjM5MDIyfQ.EIhC9PGYLcdthkey0bm_xzXO0tC361f7bvbXuq3T4Q0'
const sessionUser = { sub: '1', name: 'John Doe', iat: 1816239022 }
const currentUser = { id: '1', name: 'John Doe', email: 'john_doe@example.com' }

const assertDeepEqual = (
  actual: any,
  expected: any,
  debug: boolean = false,
) => {
  if (debug) {
    console.log('actual', actual[0].notification)
    console.log('expected', expected[0].notification)
  }
  assert.deepEqual(actual, expected)
}

beforeAll(() => {
  store = configureStore({})
  state$ = store[$$observable]()
})

afterEach(cleanup)

describe('Session Login, Authorize, Logout Epics', () => {
  it('successful login', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      assertDeepEqual(actual, expected, false)
    })

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const params = { email: 'john_doe@example.com', password: 'foobar' }
      const response = { body: { token: sessionToken } }

      const action$ = hot('-a', {
        a: sessionLogin(params),
      })

      const dependencies = {
        apiClient: {
          execute: () =>
            cold('--a', {
              a: response,
            }),
        },
      }

      const output$ = sessionLoginEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('---a', {
        a: {
          type: SESSION_AUTHORIZE,
          payload: sessionToken,
        },
      })
    })
  })

  it('authorization', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      assertDeepEqual(actual, expected, false)
    })

    testScheduler.run(({ hot, cold, expectObservable }) => {
      store.dispatch(sessionAuthorize(sessionToken))

      const action$ = hot('-a', {
        a: sessionAuthorize(sessionToken),
      })

      const dependencies = {
        apiClient: {
          authorizations: {},
        },
      }

      const output$ = sessionAuthorizeEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('-a', {
        a: {
          type: USER_FETCH,
          payload: sessionUser.sub,
        },
      })
    })
  })

  it('logout', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      assertDeepEqual(actual, expected, false)
    })

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: sessionLogout(),
      })

      const dependencies = {
        apiClient: {
          authorizations: {},
        },
      }

      const output$ = sessionLogoutEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('-a', {
        a: {
          type: USER_CLEAR,
        },
      })
    })
  })
})
