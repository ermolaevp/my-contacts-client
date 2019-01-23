import createReducer from '../../utils/create-reducer'
import { API_ERROR, API_ERROR_CLEAR } from '../actions/errors'

const initalState = {
  status: undefined,
  statusText: undefined,
}

const apiError = (state: any, { payload }: any) => state.merge(payload)

const apiErrorClear = (state: any) => state.merge(initalState)

const handlers = {
  [API_ERROR]: apiError,
  [API_ERROR_CLEAR]: apiErrorClear,
}

export default createReducer(initalState, handlers)
