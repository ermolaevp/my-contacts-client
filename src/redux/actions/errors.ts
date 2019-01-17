export const ERROR_ADD = 'error/add'
export const errorAdd = (key: string, error: any) => {
  const { response } = error
  return typeof response.body === 'undefined'
    ? {
        type: ERROR_ADD,
        payload: {
          key,
          status: response.status,
          statusText: response.statusText,
        },
      }
    : {
        type: key,
        payload: response.body.errors ? response.body.errors : response.body,
      }
}

export const ERROR_CLEAR = 'error/clear'
export const errorClear = () => ({ type: ERROR_CLEAR })
