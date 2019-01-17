import { Theme, createStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    addButton: {
      position: 'absolute',
      top: -theme.spacing.unit * 2,
      left: -theme.spacing.unit * 2,
    },
  })

export default styles
