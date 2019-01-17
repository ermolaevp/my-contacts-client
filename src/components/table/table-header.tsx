import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { IEnhancedTableHead } from './types'

const headerStyles = (theme: Theme) => createStyles({})

class EnhancedTableHead extends React.Component<IEnhancedTableHead> {
  public render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      columns,
      classes,
    } = this.props

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columns.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric} /* TODO: use align */
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
          <TableCell />
        </TableRow>
      </TableHead>
    )
  }
  private createSortHandler = (property: any) => (event: any) => {
    this.props.onRequestSort(event, property)
  }
}

export default withStyles(headerStyles)(EnhancedTableHead)
