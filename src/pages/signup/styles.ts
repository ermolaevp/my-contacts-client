import { Theme, createStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
    paper: {
      padding: theme.spacing.unit * 4,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    error: {
      padding: theme.spacing.unit * 2,
    },
  })

export default styles
