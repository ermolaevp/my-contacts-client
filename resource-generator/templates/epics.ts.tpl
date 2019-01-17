import { ofType } from 'redux-observable'
import {
  map,
  mapTo,
  filter,
  mergeMap,
  withLatestFrom,
  catchError,
} from 'rxjs/operators'
import { from, of } from 'rxjs'
import * as actions from '../actions/<%= plural %>'
import { errorAdd } from '../actions/index'

export const <%= plural %>FetchEpic = (
  action$: any,
  state$: any,
  { apiClient }: any,
) =>
  action$.pipe(
    ofType(actions.<%= PLURAL %>_FETCH),
    withLatestFrom(state$),
    mergeMap(([action, state]: any) =>
      from(
        apiClient.execute({
          pathName: '/users/{user_id}/<%= plural %>',
          method: 'get',
          parameters: {
            user_id: state.currentUser.id,
            page: action.payload.page,
          },
        }),
      ).pipe(
        map((response: any) => actions.<%= plural %>Update(response.body)),
        catchError(error => of(errorAdd(actions.<%= PLURAL %>_FETCH, error))),
      ),
    ),
  )
