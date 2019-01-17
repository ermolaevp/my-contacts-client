import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import SearchIcon from '@material-ui/icons/Search'
import { Form } from 'react-final-form'
import { IEnhancedTableToolbar } from '../types'
import styles from './styles'
import SearchForm from './search-form'

const EnhancedTableToolbar = (props: IEnhancedTableToolbar) => {
  const { numSelected, classes, caption, onRequestFilter, filterBy } = props

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {caption}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      {onRequestFilter && filterBy && numSelected === 0 && (
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Form
            render={SearchForm({ name: filterBy, classes })}
            onSubmit={onRequestFilter}
          />
        </div>
      )}
      <div className={classes.actions}>
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  )
}

export default withStyles(styles)(EnhancedTableToolbar)
