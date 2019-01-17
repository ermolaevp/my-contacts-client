import createReducer from '../../utils/create-reducer'
import jwtDecode from 'jwt-decode'
import {
  SESSION_LOGIN,
  SESSION_LOGOUT,
  SESSION_AUTHORIZE,
} from '../actions/session'

export interface ISessionUser {
  aud: string | null
  exp: number
  iat: number
  id: number
  jti: string
  scp: string
  sub: string
}

const initalState = {
  token: null,
  user: null,
}

const sessionAuthorize = (state: any, { payload }: any) => {
  const user = jwtDecode(payload)
  return state.merge({
    token: payload,
    user,
  })
}

const sessionLogin = (state: any) => state

const sessionLogout = (state: any) => state.merge(initalState)

const handlers = {
  [SESSION_AUTHORIZE]: sessionAuthorize,
  [SESSION_LOGIN]: sessionLogin,
  [SESSION_LOGOUT]: sessionLogout,
}

export default createReducer(initalState, handlers)
