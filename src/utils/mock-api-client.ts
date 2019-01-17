export const mock: { [index: string]: any } = {
  '/users/sign_in': {
    post: {
      body: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxODE2MjM5MDIyfQ.EIhC9PGYLcdthkey0bm_xzXO0tC361f7bvbXuq3T4Q0',
      },
    },
  },
  '/users': {
    post: {
      body: {
        id: '1',
        name: 'John Doe',
        email: 'john_doe@example.com',
      },
    },
  },
  '/users/{id}': {
    get: {
      body: {
        id: 1,
        name: 'John Doe',
        email: 'john_doe@example.com',
      },
    },
  },
  '/users/{id}/contacts': {
    get: {
      body: [{ id: 1, number: '+111' }, { id: 2, number: '+222' }],
      meta: {},
    },
  },
}

export const mockResponse = ({
  pathName,
  method,
}: {
  pathName: string
  method: string
}) => {
  return mock[pathName][method]
}

export const apiClient = {
  execute: (params: any) => Promise.resolve(mockResponse(params)),
  authorizations: {},
}

export default apiClient
