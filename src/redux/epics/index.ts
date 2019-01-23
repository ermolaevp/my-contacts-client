import { combineEpics } from 'redux-observable'
import sessionEpics from './session'
import contactsEpics from './contacts'
import userEpics from './user'

export const rootEpic = combineEpics(sessionEpics, contactsEpics, userEpics)

export default rootEpic
