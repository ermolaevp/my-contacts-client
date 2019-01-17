import * as React from 'react'
import { Form } from 'react-final-form'
import {
  SESSION_LOGIN,
  SESSION_AUTHORIZE,
  SESSION_LOGIN_ERROR,
} from '../../redux/actions/session'
import {
  Grid,
  Paper,
  withStyles,
  Typography,
  DialogContentText,
} from '@material-ui/core'
import LoginForm from './login-form'
import compose from '../../utils/compose'
import { Link } from 'react-router-dom'
import { promiseListener } from '../../redux/configureStore'
import MakeAsyncFunction from 'react-redux-promise-listener'
import styles from './styles'

const validate = ({ email, password }: any) => {
  const errors: any = {}
  if (!email) {
    errors.email = 'Required'
  }
  if (!password) {
    errors.password = 'Required'
  }
  return errors
}

interface IProps {
  classes: any
}

const Login = ({ classes }: IProps) => {
  const handleLogin = (handleSubmit: any) => (values: object) =>
    handleSubmit(values).then(() => {
      window.location.href = '/'
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
            Login or <Link to="/signup">Signup</Link>
          </Typography>
          <DialogContentText>
            Demo credentials:
            <br />
            demo@example.com
            <br />
            password
          </DialogContentText>
          <MakeAsyncFunction
            listener={promiseListener}
            start={SESSION_LOGIN}
            resolve={SESSION_AUTHORIZE}
            reject={SESSION_LOGIN_ERROR}
          >
            {(handleSubmit: any) => (
              <Form
                render={LoginForm(classes)}
                onSubmit={handleLogin(handleSubmit)}
                validate={validate}
              />
            )}
          </MakeAsyncFunction>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default compose(withStyles(styles))(Login)
