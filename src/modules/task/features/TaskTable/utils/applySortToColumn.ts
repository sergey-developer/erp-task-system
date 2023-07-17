import { ColumnsType } from 'antd/es/table'
import isEqual from 'lodash/isEqual'

import { ArrayItem } from 'shared/interfaces/utils'

import { SortValue } from '../constants/sort'
import { TaskTableListItem } from '../interfaces'
import { parseSort } from './parseSort'

export const applySortToColumn = (
  column: ArrayItem<ColumnsType<TaskTableListItem>>,
  sort: SortValue,
): ArrayItem<ColumnsType<TaskTableListItem>> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.key, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}
