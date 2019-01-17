import Immutable from 'seamless-immutable'

const createReducer = (initialState: object, handlers: any) => (
  state = Immutable(initialState),
  action: any,
) => (handlers[action.type] ? handlers[action.type](state, action) : state)

export default createReducer
