import React from 'react'
import { SESSION_LOGIN, SESSION_AUTHORIZE } from '../../redux/actions/session'
import { FORM_ERROR } from '../../redux/actions/errors'
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
  const homeRedirect = () => (window.location.href = '#/')
  const onError = (err: any) => console.log(err)
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
          <LoginForm
            startActionType={SESSION_LOGIN}
            resolveActionType={SESSION_AUTHORIZE}
            rejectActionType={FORM_ERROR}
            onSuccess={homeRedirect}
            onError={onError}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default compose(withStyles(styles))(Login)
