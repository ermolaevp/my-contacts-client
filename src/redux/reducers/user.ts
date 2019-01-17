import createReducer from '../../utils/create-reducer'
import { USER_FETCH, USER_UPDATE, USER_CLEAR } from '../actions/user'

const initalState = {
  id: undefined,
  email: undefined,
  roles: [],
}

const userFetch = (state: any) => state

const userUpdate = (state: any, { payload }: any) => state.merge(payload)

const userClear = (state: any) => state.merge(initalState)

const handlers = {
  [USER_FETCH]: userFetch,
  [USER_UPDATE]: userUpdate,
  [USER_CLEAR]: userClear,
}

export default createReducer(initalState, handlers)
