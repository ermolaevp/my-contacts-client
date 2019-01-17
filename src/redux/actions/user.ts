export const USER_FETCH = 'user/fetch'
export const userFetch = (payload: number) => ({
  type: USER_FETCH,
  payload,
})

export const USER_FETCH_ERROR = 'user/fetch/error'

export const USER_UPDATE = 'user/update'
export const userUpdate = (payload: object) => ({
  type: USER_UPDATE,
  payload,
})

export const USER_CLEAR = 'user/clear'
export const userClear = () => ({
  type: USER_CLEAR,
})

export const USER_SIGNUP = 'user/signup'
export const userSignup = (payload: object) => ({
  type: USER_SIGNUP,
  payload,
})

export const USER_SIGNUP_ERROR = 'user/signup/error'
export const userSignupError = (error: any) => ({
  type: USER_SIGNUP_ERROR,
  payload: error.response.body.errors,
})

export const USER_SIGNUP_SUCCESS = 'user/signup/success'
