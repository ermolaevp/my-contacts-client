import { ofType, combineEpics } from 'redux-observable'
import toPairs from 'lodash/toPairs'
import flatten from 'lodash/flatten'
import {
  map,
  debounce,
  mergeMap,
  withLatestFrom,
  catchError,
} from 'rxjs/operators'
import { from, of, timer } from 'rxjs'
import {
  CONTACTS_FETCH,
  CONTACTS_SET_PAGE,
  CONTACTS_SET_PER_PAGE,
  CONTACTS_SET_SORT,
  contactsUpdate,
  CONTACTS_SET_FILTER,
  CONTACT_SEND_UPDATE,
  CONTACT_SEND_ADD,
  CONTACT_SEND_DELETE,
  contactUpdate,
  contactAdd,
  contactDelete,
} from '../actions/contacts'
import { formError, apiError } from '../actions/errors'
import { user } from '../../selectors'

export const contactsFetchEpic = (
  action$: any,
  state$: any,
  { apiClient }: any,
) =>
  action$.pipe(
    ofType(
      CONTACTS_FETCH,
      CONTACTS_SET_PAGE,
      CONTACTS_SET_PER_PAGE,
      CONTACTS_SET_SORT,
      CONTACTS_SET_FILTER,
    ),
    debounce(() => timer(300)),
    withLatestFrom(state$),
    mergeMap(([, state]: any) =>
      from(
        apiClient.execute({
          pathName: '/users/{user_id}/contacts',
          method: 'get',
          parameters: {
            user_id: user(state).id,
            page: state.contacts.meta.currentPage,
            per_page: state.contacts.meta.perPage,
            q: flatten(toPairs(state.contacts.filter)).join(','),
          },
        }),
      ).pipe(
        map((response: any) => contactsUpdate(response.body, response.meta)),
        catchError(error => of(apiError(error))),
      ),
    ),
  )

export const contactSendUpdateEpic = (
  action$: any,
  state$: any,
  { apiClient }: any,
) =>
  action$.pipe(
    ofType(CONTACT_SEND_UPDATE),
    withLatestFrom(state$),
    mergeMap(([{ payload }, state]: any) =>
      from(
        apiClient.execute({
          pathName: '/users/{user_id}/contacts/{id}',
          method: 'put',
          parameters: {
            user_id: user(state).id,
            id: payload.id,
            body: { contact: payload },
          },
        }),
      ).pipe(
        map((response: any) => contactUpdate(response.body)),
        catchError(error => of(formError(error), apiError(error))),
      ),
    ),
  )

export const contactSendAddEpic = (
  action$: any,
  state$: any,
  { apiClient }: any,
) =>
  action$.pipe(
    ofType(CONTACT_SEND_ADD),
    withLatestFrom(state$),
    mergeMap(([{ payload }, state]: any) =>
      from(
        apiClient.execute({
          pathName: '/users/{user_id}/contacts',
          method: 'post',
          parameters: {
            user_id: user(state).id,
            body: { contact: payload },
          },
        }),
      ).pipe(
        map((response: any) => contactAdd(response.body)),
        catchError(error =>
          of(formError(error.response.body), apiError(error.response)),
        ),
      ),
    ),
  )

export const contactSendDeleteEpic = (
  action$: any,
  state$: any,
  { apiClient }: any,
) =>
  action$.pipe(
    ofType(CONTACT_SEND_DELETE),
    withLatestFrom(state$),
    mergeMap(([{ payload }, state]: any) =>
      from(
        apiClient.execute({
          pathName: '/users/{user_id}/contacts/{id}',
          method: 'delete',
          parameters: {
            user_id: user(state).id,
            id: payload.id,
          },
        }),
      ).pipe(
        map(() => contactDelete(payload.id)),
        catchError(error => of(formError(error), apiError(error))),
      ),
    ),
  )

export default combineEpics(
  contactsFetchEpic,
  contactSendUpdateEpic,
  contactSendAddEpic,
  contactSendDeleteEpic,
)
