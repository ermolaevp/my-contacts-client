import React from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import EnhancedTableHead from './table-header'
import EnhancedTableToolbar from './table-toolbar'
import { IEnhancedTable, IEnhancedTableState } from './types'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  })

class EnhancedTable extends React.Component<IEnhancedTable> {
  public state: IEnhancedTableState = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
  }

  public render() {
    const { classes } = this.props
    const { order, orderBy, selected } = this.state
    const {
      data,
      columns,
      caption,
      currentPage,
      perPage,
      totalCount,
      onRequestFilter,
      filterBy,
    } = this.props
    const emptyRows =
      perPage - Math.min(perPage, totalCount - currentPage * perPage)
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          caption={caption}
          onRequestFilter={onRequestFilter}
          filterBy={filterBy}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              columns={columns}
            />
            <TableBody>
              {data.map(n => {
                const isSelected = this.isSelected(n.id)
                return (
                  <TableRow
                    hover={true}
                    onClick={this.handleShowRowClick(n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onClick={this.handleSelect(n.id)}
                      />
                    </TableCell>
                    {/* <TableCell component="th" scope="row" padding="none">
                      {n.name}
                    </TableCell> */}
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        component={column.id === 'name' ? 'th' : 'td'}
                        padding={column.id === 'name' ? 'none' : 'default'}
                      >
                        {n[column.id]}
                      </TableCell>
                    ))}
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="Edit"
                          onClick={this.handleEditRowClick(n.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="Delete"
                          onClick={this.handleDeleteRowClick(n.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
              {/*emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={columns.length + 1} />
                </TableRow>
              )*/}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={perPage}
          page={currentPage - 1}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }

  private handleRequestSort = (event: any, property: string) => {
    const orderBy = property
    let order: 'asc' | 'desc' = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
    this.props.onRequestSort(order, orderBy)
  }

  private handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      this.setState({
        selected: this.props.data.map((n: any) => n.id),
      })
      return
    }
    this.setState({ selected: [] })
  }

  private handleSelect = (id: number) => (e: any) => {
    e.stopPropagation()
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected: any[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({ selected: newSelected })
  }

  private handleChangePage = (event: any, page: number) => {
    this.props.onChangePage(page + 1)
    // this.setState({ page })
  }

  private handleChangeRowsPerPage = (event: any) => {
    this.props.onChangeRowsPerPage(event.target.value)
    // this.setState({ rowsPerPage: event.target.value })
  }

  private isSelected = (id: number) => this.state.selected.indexOf(id) !== -1

  private handleEditRowClick = (id: number) => (e: any) => {
    e.stopPropagation()
    if (this.props.onRequestEdit) {
      this.props.onRequestEdit(id)
    }
  }

  private handleDeleteRowClick = (id: number) => (e: any) => {
    e.stopPropagation()
    if (this.props.onRequestDelete) {
      this.props.onRequestDelete(id)
    }
  }

  private handleShowRowClick = (id: number) => (e: any) => {
    e.stopPropagation()
    if (this.props.onRequestShow) {
      this.props.onRequestShow(id)
    }
  }
}

export default withStyles(styles)(EnhancedTable)
