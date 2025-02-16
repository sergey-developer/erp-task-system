import { ColumnType } from 'antd/es/table'
import { GetTasksSortValue } from 'features/tasks/api/schemas'
import isEqual from 'lodash/isEqual'

import { TaskTableItem } from '../types'
import { parseSort } from './parseSort'

export const applySortToColumn = (
  column: ColumnType<TaskTableItem>,
  sort: GetTasksSortValue,
): ColumnType<TaskTableItem> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.dataIndex, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}
