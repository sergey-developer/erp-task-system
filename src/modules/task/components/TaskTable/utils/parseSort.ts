import { SortOrder } from 'antd/es/table/interface'

import { GetTaskListSortValue } from 'modules/task/models'

import { SortOrderEnum } from 'shared/constants/sort'

import { sortValueToSortableField } from '../constants/sort'
import { TaskTableColumnKey } from '../types'

export const parseSort = (
  value: GetTaskListSortValue,
): { order: SortOrder; columnKey: TaskTableColumnKey } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey: sortValueToSortableField[parsedValue as GetTaskListSortValue],
  }
}
