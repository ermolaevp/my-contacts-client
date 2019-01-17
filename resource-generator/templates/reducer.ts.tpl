import createReducer from '../../utils/create-reducer'
import {
  <%= PLURAL %>_FETCH,
  <%= PLURAL %>_UPDATE,
  <%= PLURAL %>_REMOVE,
} from '../actions/<%= plural %>'
import Immutable from 'seamless-immutable'

const initalState = {}

const <%= plural %>Update = (state: any, action: any) => state.merge(action.payload)
const <%= plural %>Fetch = (state: any) => state
const <%= plural %>Remove = () => Immutable(initalState)

const handlers = {
  [<%= PLURAL %>_UPDATE]: <%= plural %>Update,
  [<%= PLURAL %>_REMOVE]: <%= plural %>Remove,
  [<%= PLURAL %>_FETCH]: <%= plural %>Fetch,
}

export default createReducer(initalState, handlers)
