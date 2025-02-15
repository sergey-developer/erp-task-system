import { ColumnType } from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface'
import isEqual from 'lodash/isEqual'

import { SortOrderEnum } from 'shared/constants/sort'

import { GetWarehousesSortKey, GetWarehousesSortValue } from '../../api/schemas'
import { WarehouseTableItem } from './types'

export type SortableField = keyof Pick<
  WarehouseTableItem,
  'title' | 'legalEntity' | 'address' | 'parent'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [GetWarehousesSortKey, Exclude<GetWarehousesSortValue, GetWarehousesSortKey>]
> = {
  title: ['title', '-title'],
  address: ['address', '-address'],
  parent: ['parent', '-parent'],
  legalEntity: ['legal_entity', '-legal_entity'],
}

// todo: создать функцию для переиспользования
export const sortValueToSortableField = Object.keys(sortableFieldToSortValues).reduce(
  (acc, field) => {
    const sortableField = field as SortableField
    const [ascendValue, descendValue] = sortableFieldToSortValues[sortableField]

    acc[ascendValue] = sortableField
    acc[descendValue] = sortableField

    return acc
  },
  {} as Record<GetWarehousesSortValue, SortableField>,
)

export const applySort = (
  column: ColumnType<WarehouseTableItem>,
  sort: GetWarehousesSortValue,
): ColumnType<WarehouseTableItem> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.key, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}

// todo: создать функцию для переиспользования
export const getSort = (field: SortableField, order: SortOrder): GetWarehousesSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}

// todo: создать фунцию для переиспользования
export const parseSort = (
  value: GetWarehousesSortValue,
): { order: SortOrder; columnKey: SortableField } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey: sortValueToSortableField[parsedValue as GetWarehousesSortValue],
  }
}
