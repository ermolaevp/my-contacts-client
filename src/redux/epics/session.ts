import { ofType, combineEpics } from 'redux-observable'
import { map, mergeMap, withLatestFrom, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { createCookie, eraseCookie } from '../../utils/manage-cookies'
import { TOKEN_COOKIE_NAME } from '../../constants'
import {
  SESSION_LOGOUT,
  sessionAuthorize,
  SESSION_LOGIN_ERROR,
  SESSION_LOGIN,
  SESSION_AUTHORIZE,
} from '../actions/session'
import { userClear, userFetch } from '../actions/user'
import { errorAdd } from '../actions/errors'

export const sessionLoginEpic = (
  action$: any,
  state$: any,
  { apiClient }: any,
) =>
  action$.pipe(
    ofType(SESSION_LOGIN),
    mergeMap(({ payload }) =>
      from(
        apiClient.execute({
          pathName: '/users/sign_in',
          method: 'post',
          parameters: {
            body: {
              user: payload,
            },
          },
        }),
      ).pipe(
        map((response: any) => sessionAuthorize(response.body.token)),
        catchError(error => of(errorAdd(SESSION_LOGIN_ERROR, error))),
      ),
    ),
  )

export const sessionAuthorizeEpic = (
  action$: any,
  state$: any,
  { apiClient }: any,
) =>
  action$.pipe(
    ofType(SESSION_AUTHORIZE),
    withLatestFrom(state$),
    map(([, { session }]: any) => {
      createCookie(TOKEN_COOKIE_NAME, session.token, session.user.exp)
      apiClient.token = session.token
      return userFetch(session.user.sub)
    }),
  )

export const sessionLogoutEpic = (
  action$: any,
  state$: any,
  { apiClient }: any,
) =>
  action$.pipe(
    ofType(SESSION_LOGOUT),
    map(() => {
      eraseCookie(TOKEN_COOKIE_NAME)
      apiClient.token = undefined
      return userClear()
    }),
  )

export default combineEpics(
  sessionLoginEpic,
  sessionAuthorizeEpic,
  sessionLogoutEpic,
)
