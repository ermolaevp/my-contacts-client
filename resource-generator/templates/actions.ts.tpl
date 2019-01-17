export const <%= PLURAL %>_FETCH = '<%= plural %>/fetch'
export const <%= plural %>Fetch = (page: number = 1) => ({
  type: <%= PLURAL %>_FETCH,
  payload: {
    page,
  },
})

export const <%= PLURAL %>_UPDATE = '<%= plural %>/update'
export const <%= plural %>Update = (payload: object) => ({
  type: <%= PLURAL %>_UPDATE,
  payload,
})

export const <%= PLURAL %>_REMOVE = '<%= plural %>/remove'
export const <%= plural %>Remove = () => ({
  type: <%= PLURAL %>_REMOVE,
})
