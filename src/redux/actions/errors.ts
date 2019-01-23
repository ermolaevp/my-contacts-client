import { FORM_ERROR as FINAL_FORM_ERROR } from 'final-form'

export const FORM_ERROR = 'form_error'
export const formError = (responseBody: any) => {
  const { error, errors } = responseBody
  const resp = {
    type: FORM_ERROR,
    payload: {},
  }
  if (error) {
    resp.payload = { [FINAL_FORM_ERROR]: error }
  }
  if (errors) {
    resp.payload = errors
  }
  return resp
}

export const FORM_ERROR_CLEAR = 'form_error/clear'
export const formErrorClear = () => ({ type: FORM_ERROR_CLEAR })

export const API_ERROR = 'api_error'
export const apiError = (response: any) => {
  const { status, statusText } = response
  return {
    type: API_ERROR,
    payload: {
      status,
      statusText,
    },
  }
}

export const API_ERROR_CLEAR = 'api_error/clear'
export const apiErrorClear = () => ({
  type: API_ERROR_CLEAR,
})
