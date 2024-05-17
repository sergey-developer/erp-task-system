import { ColumnType } from 'antd/es/table'
import isEqual from 'lodash/isEqual'

import { GetTasksSortValue } from 'modules/task/models'

import { TaskTableListItem } from '../types'
import { parseSort } from './parseSort'

export const applySortToColumn = (
  column: ColumnType<TaskTableListItem>,
  sort: GetTasksSortValue,
): ColumnType<TaskTableListItem> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.key, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}
