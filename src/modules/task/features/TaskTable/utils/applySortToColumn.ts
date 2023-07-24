import { ColumnType } from 'antd/es/table'

import { isEqual } from 'shared/utils/common/isEqual'

import { SortValue } from '../constants/sort'
import { TaskTableListItem } from '../interfaces'
import { parseSort } from './parseSort'

export const applySortToColumn = (
  column: ColumnType<TaskTableListItem>,
  sort: SortValue,
): ColumnType<TaskTableListItem> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.key, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}
