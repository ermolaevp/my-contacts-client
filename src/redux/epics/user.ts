import { ofType, combineEpics } from 'redux-observable'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import {
  USER_SIGNUP,
  USER_SIGNUP_ERROR,
  USER_FETCH,
  USER_FETCH_ERROR,
  userUpdate,
} from '../actions/user'
import { sessionLogin } from '../actions/session'
import { errorAdd } from '../actions/errors'

export const useFetchEpic = (action$: any, state$: any, { apiClient }: any) =>
  action$.pipe(
    ofType(USER_FETCH),
    mergeMap(({ payload }: any) =>
      from(
        apiClient.execute({
          pathName: '/users/{id}',
          method: 'get',
          parameters: { id: payload },
        }),
      ).pipe(
        map((response: any) => userUpdate(response.body)),
        catchError(error => of(errorAdd(USER_FETCH_ERROR, error))),
      ),
    ),
  )

export const userSignupEpic = (action$: any, state$: any, { apiClient }: any) =>
  action$.pipe(
    ofType(USER_SIGNUP),
    mergeMap(({ payload }) =>
      from(
        apiClient.execute({
          pathName: '/users',
          method: 'post',
          parameters: {
            body: {
              user: payload,
            },
          },
        }),
      ).pipe(
        map(() => sessionLogin(payload)),
        catchError(error => of(errorAdd(USER_SIGNUP_ERROR, error))),
      ),
    ),
  )

export default combineEpics(useFetchEpic, userSignupEpic)
