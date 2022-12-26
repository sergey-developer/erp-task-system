import { SortOrder } from 'antd/es/table/interface'

import { SortOrderEnum } from 'shared/constants/sort'

import { SortValue, sortValueToSortableField } from '../constants/sort'

export const parseSort = (
  value: SortValue,
): { order: SortOrder; columnKey: string } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey: sortValueToSortableField[parsedValue as SortValue],
  }
}
