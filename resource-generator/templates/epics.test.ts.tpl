import { assert } from 'chai'
import $$observable from 'symbol-observable'
import { TestScheduler } from 'rxjs/testing'
import { cleanup } from 'react-testing-library'
import * as epics from '../../../redux/epics/<%= plural %>'
import * as actions from '../../../redux/actions/<%= plural %>'
import { currentUserUpdate } from '../../../redux/actions/index'

import configureStore from '../../../redux/configureStore'

const currentUser = { id: '1', name: 'John Doe', email: 'john_doe@example.com' }

const store: any = configureStore({})
const state$ = store[$$observable]()

afterEach(cleanup)

beforeAll(() => {
  store.dispatch(currentUserUpdate(currentUser))
})

describe('<%= Plural %> Epics', () => {
  it('dispatches <%= plural %>Update action', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      // console.log('actual', actual[0].notification)
      // console.log('expected', expected[0].notification)
      assert.deepEqual(actual, expected)
    })

    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: actions.<%= plural %>Fetch(),
      })

      const dependencies = {
        apiClient: {
          execute: () =>
            cold('--a', {
              a: {
                body: {},
              },
            }),
        },
      }

      const output$ = epics.<%= plural %>FetchEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('---a', {
        a: {
          type: '<%= plural %>/update',
          payload: {},
        },
      })
    })
  })
})
