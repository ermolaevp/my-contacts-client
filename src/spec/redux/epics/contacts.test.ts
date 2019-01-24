import { assert } from 'chai'
import $$observable from 'symbol-observable'
import { TestScheduler } from 'rxjs/testing'
import { cleanup } from 'react-testing-library'
import * as epics from '../../../redux/epics/contacts'
import * as actions from '../../../redux/actions/contacts'
import { userUpdate } from '../../../redux/actions/user'
import { mockResponse } from '../../../utils/mock-api-client'
import configureStore from '../../../redux/configureStore'

const user = { id: '1', name: 'John Doe', email: 'john_doe@example.com' }

const store: any = configureStore({})
const state$ = store[$$observable]()

const assertDeepEqual = (
  actual: any,
  expected: any,
  debug: boolean = false,
) => {
  if (debug) {
    console.log('actual', actual[0].frame, actual[0].notification)
    console.log('expected', expected[0].frame, expected[0].notification)
  }
  assert.deepEqual(actual, expected)
}

afterEach(cleanup)

describe('Contacts Epics', () => {
  it('dispatches contactsUpdate action', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      assertDeepEqual(actual, expected, false)
    })

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const response = mockResponse({
        pathName: '/users/{user_id}/contacts',
        method: 'get',
      })

      const action$ = hot('-a', {
        a: actions.contactsFetch(),
      })

      const dependencies = {
        apiClient: {
          execute: () =>
            cold('--a', {
              a: response,
            }),
        },
      }

      const output$ = epics.contactsFetchEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('300ms ---a', {
        a: {
          type: actions.CONTACTS_UPDATE,
          payload: { items: response.body, meta: response.meta },
        },
      })
    })
  })
  it('dispatches contactUpdate action', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      assertDeepEqual(actual, expected, false)
    })

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const response = mockResponse({
        pathName: '/users/{user_id}/contacts/{id}',
        method: 'put',
      })

      const action$ = hot('-a', {
        a: actions.contactSendAdd({}),
      })

      const dependencies = {
        apiClient: {
          execute: () =>
            cold('--a', {
              a: response,
            }),
        },
      }

      const output$ = epics.contactSendAddEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('---a', {
        a: actions.contactAdd({}),
      })
    })
  })
})
