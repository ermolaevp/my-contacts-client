import React from 'react'
import { Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { user } from '../../selectors'
import { connect } from 'react-redux'
import { sessionLogout } from '../../redux/actions/session'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/main'
// import Checkbox from '../../components/ui/input/checkbox'
// import Radio from '../../components/ui/input/radio'

const selectors = createStructuredSelector({
  user,
})

const mapDispatch = {
  sessionLogout,
}

const Home = (props: any) => {
  return <MainLayout>Welcome Home</MainLayout>
}

export default connect(
  selectors,
  mapDispatch,
)(Home)
