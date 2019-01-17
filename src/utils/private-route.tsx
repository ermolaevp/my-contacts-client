import * as React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { user } from '../selectors'
import { createStructuredSelector } from 'reselect'
import Login from '../pages/login'

const selectors = createStructuredSelector({
  user,
})

interface IPrivateRoute {
  user: any
}

const PrivateRoute = ({
  component,
  user: currentUser,
  ...rest
}: RouteProps & IPrivateRoute) => (
  <Route {...rest} component={currentUser.id ? component : Login} />
)

export default connect(selectors)(PrivateRoute)
