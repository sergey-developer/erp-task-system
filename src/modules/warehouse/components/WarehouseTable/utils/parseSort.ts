import { SortOrder } from 'antd/es/table/interface'

import { GetWarehouseListSortValue } from 'modules/warehouse/models'

import { SortOrderEnum } from 'shared/constants/sort'

import { sortValueToSortableField } from '../sort'

// todo: создать фунцию для переиспользования
export const parseSort = (
  value: GetWarehouseListSortValue,
): { order: SortOrder; columnKey: string } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey:
      sortValueToSortableField[parsedValue as GetWarehouseListSortValue],
  }
}
