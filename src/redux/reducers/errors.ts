import createReducer from '../../utils/create-reducer'
import { ERROR_ADD, ERROR_CLEAR } from '../actions/errors'

const initalState = {
  key: undefined,
  status: undefined,
  statusText: undefined,
}

const errorAdd = (state: any, { payload }: any) => state.merge(payload)

const errorClear = (state: any) => state.merge(initalState)

const handlers = {
  [ERROR_ADD]: errorAdd,
  [ERROR_CLEAR]: errorClear,
}

export default createReducer(initalState, handlers)
