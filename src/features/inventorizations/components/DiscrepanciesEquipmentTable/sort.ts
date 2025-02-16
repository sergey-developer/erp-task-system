import { ColumnType } from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface'
import {
  GetInventorizationEquipmentsSortKey,
  GetInventorizationEquipmentsSortValue,
} from 'features/inventorizations/api/schemas'
import isEqual from 'lodash/isEqual'

import { SortOrderEnum } from 'shared/constants/sort'

import { DiscrepanciesEquipmentTableItem } from './types'

export type SortableField = keyof Pick<
  DiscrepanciesEquipmentTableItem,
  'equipment' | 'locationPlan' | 'locationFact' | 'quantity'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [
    GetInventorizationEquipmentsSortKey,
    Exclude<GetInventorizationEquipmentsSortValue, GetInventorizationEquipmentsSortKey>,
  ]
> = {
  equipment: ['title', '-title'],
  locationPlan: ['location_plan', '-location_plan'],
  locationFact: ['location_fact', '-location_fact'],
  quantity: ['diff', '-diff'],
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
  {} as Record<GetInventorizationEquipmentsSortValue, SortableField>,
)

export const applySort = (
  column: ColumnType<DiscrepanciesEquipmentTableItem>,
  sort: GetInventorizationEquipmentsSortValue,
): ColumnType<DiscrepanciesEquipmentTableItem> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.dataIndex, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}

// todo: создать функцию для переиспользования
export const getSort = (
  field: SortableField,
  order: SortOrder,
): GetInventorizationEquipmentsSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}

// todo: создать фунцию для переиспользования
export const parseSort = (
  value: GetInventorizationEquipmentsSortValue,
): { order: SortOrder; columnKey: SortableField } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey: sortValueToSortableField[parsedValue as GetInventorizationEquipmentsSortValue],
  }
}
