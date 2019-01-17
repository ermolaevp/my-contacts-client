import { Theme, createStyles } from '@material-ui/core/styles'
export default (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 4}px`,
    },
    spacer: {
      flex: '1 1 100%',
    },
    close: {
      padding: theme.spacing.unit / 2,
    },
  })
