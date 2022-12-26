import { ColumnsType } from 'antd/es/table'

import { isEqual } from 'shared/utils/common/isEqual'

import { SortValue } from '../constants/sort'
import { TaskTableListItem } from '../interfaces'
import { parseSort } from './parseSort'

export const applySortToColumn = (
  column: ColumnsType<TaskTableListItem>[number],
  sort: SortValue,
): ColumnsType<TaskTableListItem>[number] => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.key, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}
