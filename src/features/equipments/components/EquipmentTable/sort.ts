import { ColumnType } from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface'
import isEqual from 'lodash/isEqual'

import { SortOrderEnum } from 'shared/constants/sort'

import { GetEquipmentsSortKey, GetEquipmentsSortValue } from '../../api/schemas'
import { EquipmentTableItem } from './types'

export type SortableField = keyof Pick<
  EquipmentTableItem,
  | 'title'
  | 'serialNumber'
  | 'inventoryNumber'
  | 'location'
  | 'condition'
  | 'quantity'
  | 'category'
  | 'purpose'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [GetEquipmentsSortKey, Exclude<GetEquipmentsSortValue, GetEquipmentsSortKey>]
> = {
  title: ['title', '-title'],
  serialNumber: ['serial_number', '-serial_number'],
  inventoryNumber: ['inventory_number', '-inventory_number'],
  location: ['location', '-location'],
  condition: ['condition', '-condition'],
  quantity: ['quantity', '-quantity'],
  category: ['category', '-category'],
  purpose: ['purpose', '-purpose'],
}

export const sortValueToSortableField = Object.keys(sortableFieldToSortValues).reduce(
  (acc, field) => {
    const sortableField = field as SortableField
    const [ascendValue, descendValue] = sortableFieldToSortValues[sortableField]

    acc[ascendValue] = sortableField
    acc[descendValue] = sortableField

    return acc
  },
  {} as Record<GetEquipmentsSortValue, SortableField>,
)

export const applySort = (
  column: ColumnType<EquipmentTableItem>,
  sort: GetEquipmentsSortValue,
): ColumnType<EquipmentTableItem> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.key, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}

export const getSort = (field: SortableField, order: SortOrder): GetEquipmentsSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}

export const parseSort = (
  value: GetEquipmentsSortValue,
): { order: SortOrder; columnKey: SortableField } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey: sortValueToSortableField[parsedValue as GetEquipmentsSortValue],
  }
}
