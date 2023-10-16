import { SortOrder } from 'antd/es/table/interface'

import { GetTaskListSortValue } from 'modules/task/models'

import { SortOrderEnum } from 'shared/constants/sort'

import { sortValueToSortableField } from '../constants/sort'

export const parseSort = (value: GetTaskListSortValue): { order: SortOrder; columnKey: string } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey: sortValueToSortableField[parsedValue as GetTaskListSortValue],
  }
}
