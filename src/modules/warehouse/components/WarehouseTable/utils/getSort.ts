import { SortOrder } from 'antd/es/table/interface'

import { GetWarehouseListSortValue } from 'modules/warehouse/models'

import { SortOrderEnum } from 'shared/constants/sort'

import { SortableField, sortableFieldToSortValues } from '../sort'

// todo: создать функцию для переиспользования
export const getSort = (
  field: SortableField,
  order: SortOrder,
): GetWarehouseListSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}
