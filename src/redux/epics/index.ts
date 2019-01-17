import { combineEpics } from 'redux-observable'
import sessionEpics from './session'
import contactEpics from './contacts'
import userEpics from './user'

export const rootEpic = combineEpics(sessionEpics, contactEpics, userEpics)

export default rootEpic
