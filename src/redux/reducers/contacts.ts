import createReducer from '../../utils/create-reducer'
import {
  CONTACTS_FETCH,
  CONTACTS_UPDATE,
  CONTACTS_REMOVE,
  CONTACTS_SET_PAGE,
  CONTACTS_SET_PER_PAGE,
  CONTACTS_SET_SORT,
  CONTACTS_SET_FILTER,
  CONTACT_UPDATE,
  CONTACT_ADD,
  CONTACT_DELETE,
} from '../actions/contacts'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'

interface IAction {
  type: string
  payload?: any
}

const initalState = {
  items: [],
  meta: {
    currentPage: 1,
    perPage: 25,
    totalCount: 0,
  },
  filter: {},
}

const updateContacts = (state: any, action: IAction) =>
  state.merge(action.payload)
const fetchContacts = (state: any) => state
const removeContacts = (state: any) => state.merge(initalState)
const contactsSetPage = (state: any, action: IAction) =>
  state.merge(
    {
      meta: {
        currentPage: action.payload,
      },
    },
    { deep: true },
  )
const contactsSetPerPage = (state: any, action: IAction) =>
  state.merge(
    {
      meta: {
        perPage: action.payload,
      },
    },
    { deep: true },
  )

const contactsSetSort = (state: any, action: IAction) =>
  state.merge(
    {
      filter: {
        s: action.payload,
      },
    },
    { deep: true },
  )

const contactsSetFilter = (state: any, action: IAction) =>
  state.merge({
    filter: {
      ...action.payload,
    },
  })

const contactUpdate = (state: any, { payload }: IAction) => {
  const itemIndex = findIndex(state.items, { id: payload.id })
  return state.setIn(['items', itemIndex], payload)
}

const contactAdd = (state: any, { payload }: IAction) => {
  console.log('reducer', payload)
  return state.merge({ items: [payload] }, { deep: true })
}

const contactDelete = (state: any, { payload }: IAction) => {
  const itemIndex = findIndex(state.items, { id: payload })
  return state.without(['items', itemIndex])
}

const handlers = {
  [CONTACTS_UPDATE]: updateContacts,
  [CONTACTS_REMOVE]: removeContacts,
  [CONTACTS_FETCH]: fetchContacts,
  [CONTACTS_SET_PAGE]: contactsSetPage,
  [CONTACTS_SET_PER_PAGE]: contactsSetPerPage,
  [CONTACTS_SET_SORT]: contactsSetSort,
  [CONTACTS_SET_FILTER]: contactsSetFilter,
  [CONTACT_UPDATE]: contactUpdate,
  [CONTACT_ADD]: contactAdd,
  [CONTACT_DELETE]: contactDelete,
}

export default createReducer(initalState, handlers)
