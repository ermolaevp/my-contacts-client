export const CONTACTS_FETCH = 'contacts/fetch'
export const contactsFetch = (page: number = 1) => ({
  type: CONTACTS_FETCH,
  payload: {
    page,
  },
})

export const CONTACTS_UPDATE = 'contacts/update'
export const contactsUpdate = (items: object[] = [], meta: object = {}) => ({
  type: CONTACTS_UPDATE,
  payload: {
    items,
    meta,
  },
})

export const CONTACTS_REMOVE = 'contacts/remove'
export const contactsRemove = () => ({
  type: CONTACTS_REMOVE,
})

export const CONTACTS_SET_PAGE = 'contacts/set/page'
export const contactsSetPage = (page: number) => ({
  type: CONTACTS_SET_PAGE,
  payload: page,
})

export const CONTACTS_SET_PER_PAGE = 'contacts/set/per_page'
export const contactsSetPerPage = (perPage: number) => ({
  type: CONTACTS_SET_PER_PAGE,
  payload: perPage,
})

export const CONTACTS_SET_SORT = 'contacts/set/sort'
export const contactsSetSort = (order: 'asc' | 'desc', orderBy: string) => ({
  type: CONTACTS_SET_SORT,
  payload: `${orderBy} ${order}`,
})

export const CONTACTS_SET_FILTER = 'contacts/set/filter'
export const contactsSetFilter = (values: any) => ({
  type: CONTACTS_SET_FILTER,
  payload: values,
})

export const CONTACT_SEND_UPDATE = 'contact/send/update'
export const contactSendUpdate = (payload: object) => ({
  type: CONTACT_SEND_UPDATE,
  payload,
})

export const CONTACT_UPDATE = 'contact/update'
export const contactUpdate = (payload: object) => ({
  type: CONTACT_UPDATE,
  payload,
})

export const CONTACT_UPDATE_ERROR = 'contact/update/error'
export const contactUpdateError = (error: any) => ({
  type: CONTACT_UPDATE_ERROR,
  payload: error.response.body.errors,
})

export const CONTACT_SEND_ADD = 'contact/send/add'
export const contactSendAdd = (payload: object) => ({
  type: CONTACT_SEND_ADD,
  payload,
})

export const CONTACT_ADD = 'contact/add'
export const contactAdd = (payload: object) => ({
  test: console.log('action', payload),
  type: CONTACT_ADD,
  payload,
})

export const CONTACT_ADD_ERROR = 'contact/add/error'
export const contactAddError = (error: any) => ({
  type: CONTACT_ADD_ERROR,
  payload: error.response.body.errors,
})

export const CONTACT_SEND_DELETE = 'contact/send/delete'
export const contactSendDelete = (id: number) => ({
  type: CONTACT_SEND_DELETE,
  payload: id,
})

export const CONTACT_DELETE = 'contact/delete'
export const contactDelete = (id: number) => ({
  type: CONTACT_DELETE,
  payload: id,
})
