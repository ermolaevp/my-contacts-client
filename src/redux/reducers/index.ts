import { combineReducers } from 'redux'
import session from './session'
import user from './user'
import errors from './errors'
import contacts from './contacts'

export default combineReducers({
  session,
  user,
  errors,
  contacts,
})
