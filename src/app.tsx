import * as React from 'react'
import { IAppContext, AppContext } from './utils/app-context'
import CssBaseline from '@material-ui/core/CssBaseline'
import Routes from './routes'
import { MuiThemeProvider } from '@material-ui/core/styles'
import defaultTheme from './themes/default'

const App = (props: IAppContext) => (
  <AppContext.Provider value={props}>
    <MuiThemeProvider theme={defaultTheme}>
      <>
        <CssBaseline />
        <Routes />
      </>
    </MuiThemeProvider>
  </AppContext.Provider>
)
export default App
