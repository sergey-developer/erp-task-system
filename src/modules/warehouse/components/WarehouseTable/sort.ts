import {
  GetWarehouseListSortKey,
  GetWarehouseListSortValue,
} from 'modules/warehouse/models'

import { WarehouseTableItem } from './types'
import { ArrayFirst } from "shared/types/utils";
import { ColumnsType } from "antd/es/table";
import isEqual from "lodash/isEqual";
import { SortOrder } from "antd/es/table/interface";
import { SortOrderEnum } from "shared/constants/sort";

export type SortableField = keyof Pick<
  WarehouseTableItem,
  'title' | 'legalEntity' | 'address' | 'parent'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [
    GetWarehouseListSortKey,
    Exclude<GetWarehouseListSortValue, GetWarehouseListSortKey>,
  ]
> = {
  title: ['title', '-title'],
  address: ['address', '-address'],
  parent: ['parent', '-parent'],
  legalEntity: ['legal_entity', '-legal_entity'],
}

// todo: создать функцию для переиспользования
export const sortValueToSortableField = Object.keys(
  sortableFieldToSortValues,
).reduce((acc, field) => {
  const sortableField = field as SortableField
  const [ascendValue, descendValue] = sortableFieldToSortValues[sortableField]

  acc[ascendValue] = sortableField
  acc[descendValue] = sortableField

  return acc
}, {} as Record<GetWarehouseListSortValue, SortableField>)

export const applySort = (
  column: ArrayFirst<ColumnsType<WarehouseTableItem>>,
  sort: GetWarehouseListSortValue,
): ArrayFirst<ColumnsType<WarehouseTableItem>> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.key, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}

// todo: создать функцию для переиспользования
export const getSort = (
  field: SortableField,
  order: SortOrder,
): GetWarehouseListSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}

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
