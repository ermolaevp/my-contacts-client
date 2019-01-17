import * as React from 'react'
import { Form } from 'react-final-form'
import { USER_SIGNUP, USER_SIGNUP_ERROR } from '../../redux/actions/user'
import { Grid, Paper, withStyles, Typography } from '@material-ui/core'
import SignupForm from './signup-form'
import compose from '../../utils/compose'
import { Link } from 'react-router-dom'
import { promiseListener } from '../../redux/configureStore'
import MakeAsyncFunction from 'react-redux-promise-listener'
import styles from './styles'
import { SESSION_LOGIN } from '../../redux/actions/session'

interface IProps {
  classes: any
}

const Signup = ({ classes }: IProps) => {
  const handleSignup = (handleSubmit: any) => (values: object) =>
    handleSubmit(values).then(() => {
      window.location.href = '#/'
    })
  return (
    <Grid
      container={true}
      alignContent="center"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item={true} lg={3} md={4} xs={10}>
        <Paper className={classes.paper}>
          <Typography variant="h6">
            Signup or <Link to="/login">Login</Link>
          </Typography>
          <MakeAsyncFunction
            listener={promiseListener}
            start={USER_SIGNUP}
            resolve={SESSION_LOGIN}
            reject={USER_SIGNUP_ERROR}
          >
            {(handleSubmit: any) => (
              <Form
                render={SignupForm(classes)}
                onSubmit={handleSignup(handleSubmit)}
                initialValues={{ companyId: 1 }}
              />
            )}
          </MakeAsyncFunction>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default compose(withStyles(styles))(Signup)
