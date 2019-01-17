export interface IRow {
  id: number
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
}

export function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { id, name, calories, fat, carbs, protein }
}

export function desc(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function stableSort(array: any, cmp: any) {
  const stabilizedThis = array.map((el: any, index: any) => [el, index])
  stabilizedThis.sort((a: any, b: any) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el: any) => el[0])
}

export function getSorting(order: any, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => desc(a, b, orderBy)
    : (a: any, b: any) => -desc(a, b, orderBy)
}
