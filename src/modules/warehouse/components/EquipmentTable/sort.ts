import { ColumnsType } from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface'
import isEqual from 'lodash/isEqual'

import {
  GetEquipmentListSortKey,
  GetEquipmentListSortValue,
} from 'modules/warehouse/models'

import { SortOrderEnum } from 'shared/constants/sort'
import { ArrayFirst } from 'shared/types/utils'

import { EquipmentTableItem } from './types'

export type SortableField = keyof Pick<
  EquipmentTableItem,
  | 'title'
  | 'serialNumber'
  | 'inventoryNumber'
  | 'warehouse'
  | 'condition'
  | 'quantity'
  | 'category'
  | 'purpose'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [
    GetEquipmentListSortKey,
    Exclude<GetEquipmentListSortValue, GetEquipmentListSortKey>,
  ]
> = {
  title: ['title', '-title'],
  serialNumber: ['serial_number', '-serial_number'],
  inventoryNumber: ['inventory_number', '-inventory_number'],
  warehouse: ['warehouse', '-warehouse'],
  condition: ['condition', '-condition'],
  quantity: ['quantity', '-quantity'],
  category: ['category', '-category'],
  purpose: ['purpose', '-purpose'],
}

export const sortValueToSortableField = Object.keys(
  sortableFieldToSortValues,
).reduce((acc, field) => {
  const sortableField = field as SortableField
  const [ascendValue, descendValue] = sortableFieldToSortValues[sortableField]

  acc[ascendValue] = sortableField
  acc[descendValue] = sortableField

  return acc
}, {} as Record<GetEquipmentListSortValue, SortableField>)

export const applySort = (
  column: ArrayFirst<ColumnsType<EquipmentTableItem>>,
  sort: GetEquipmentListSortValue,
): ArrayFirst<ColumnsType<EquipmentTableItem>> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.key, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}

export const getSort = (
  field: SortableField,
  order: SortOrder,
): GetEquipmentListSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}

export const parseSort = (
  value: GetEquipmentListSortValue,
): { order: SortOrder; columnKey: string } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey:
      sortValueToSortableField[parsedValue as GetEquipmentListSortValue],
  }
}
