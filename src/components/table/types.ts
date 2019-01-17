export interface IColumn {
  id: string
  numeric: boolean
  disablePadding: boolean
  label: string
}

export interface IEnhancedTable {
  classes: any
  data: any[]
  columns: IColumn[]
  caption: string
  currentPage: number
  perPage: number
  totalCount: number
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (perPage: number) => void
  onRequestSort: (order: 'asc' | 'desc', orderBy: string) => void
  onRequestEdit?: (...args: any) => void
  onRequestDelete?: (...args: any) => void
  onRequestShow?: (...args: any) => void
  onRequestFilter?: (...args: any) => void
  filterBy?: string
}

export interface IEnhancedTableState {
  order: 'asc' | 'desc'
  orderBy: string
  selected: any[]
}

export interface IEnhancedTableHead {
  numSelected: number
  onRequestSort: (...args: any) => any
  onSelectAllClick: (...args: any) => void
  order: 'asc' | 'desc'
  orderBy: string
  rowCount: number
  columns: IColumn[]
  classes: any
}

export interface IEnhancedTableToolbar {
  classes: any
  numSelected: number
  caption: string
  onRequestFilter?: (...args: any) => void
  filterBy?: string
}
