import * as React from 'react'

export interface IAppContext {
  apiClient?: any
}

const defaultContext: IAppContext = {
  apiClient: undefined,
}

export const AppContext = React.createContext(defaultContext)

export function withAppContext(Component: any) {
  return function ComponentWithAppContext(props: any) {
    return (
      <AppContext.Consumer>
        {appContext => <Component {...props} {...appContext} />}
      </AppContext.Consumer>
    )
  }
}
