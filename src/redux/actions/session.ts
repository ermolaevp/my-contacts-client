import { FORM_ERROR } from 'final-form'

export const SESSION_LOGIN = 'session/login'
export const sessionLogin = (payload: object) => ({
  type: SESSION_LOGIN,
  payload,
})

export const SESSION_AUTHORIZE = 'session/authorize'
export const sessionAuthorize = (token: string) => ({
  type: SESSION_AUTHORIZE,
  payload: token,
})

export const SESSION_LOGIN_ERROR = 'session/login/error'
export const sessionLoginError = (error: any) => ({
  type: SESSION_LOGIN_ERROR,
  payload: { [FORM_ERROR]: error.response.body.error },
})

export const SESSION_LOGOUT = 'session/logout'
export const sessionLogout = () => ({
  type: SESSION_LOGOUT,
})
