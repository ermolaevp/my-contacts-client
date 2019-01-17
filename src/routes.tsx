import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './utils/private-route'

import Login from './pages/login'
import Signup from './pages/signup'
import Contacts from './pages/contacts'
import NotFound from './pages/not-found'

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route component={Login} path="/login" exact={true} />
      <Route component={Signup} path="/signup" exact={true} />
      <PrivateRoute component={Contacts} path="/" exact={true} />
      <Route component={NotFound} />
    </Switch>
  </HashRouter>
)

export default Routes
