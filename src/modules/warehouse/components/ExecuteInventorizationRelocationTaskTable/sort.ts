import { ColumnType } from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface'
import isEqual from 'lodash/isEqual'

import { SortOrderEnum } from 'shared/constants/sort'

import {
  ExecuteInventorizationRelocationTaskTableItem,
  ExecuteInventorizationRelocationTaskTableSortKey,
  ExecuteInventorizationRelocationTaskTableSortValue,
} from './types'

export type SortableField = keyof Pick<
  ExecuteInventorizationRelocationTaskTableItem,
  'type' | 'relocateFrom' | 'relocateTo' | 'status'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [
    ExecuteInventorizationRelocationTaskTableSortKey,
    Exclude<
      ExecuteInventorizationRelocationTaskTableSortValue,
      ExecuteInventorizationRelocationTaskTableSortKey
    >,
  ]
> = {
  type: ['type', '-type'],
  relocateFrom: ['relocate_from', '-relocate_from'],
  relocateTo: ['relocate_to', '-relocate_to'],
  status: ['status', '-status'],
}

export const sortValueToSortableField = Object.keys(sortableFieldToSortValues).reduce(
  (acc, field) => {
    const sortableField = field as SortableField
    const [ascendValue, descendValue] = sortableFieldToSortValues[sortableField]

    acc[ascendValue] = sortableField
    acc[descendValue] = sortableField

    return acc
  },
  {} as Record<ExecuteInventorizationRelocationTaskTableSortValue, SortableField>,
)

export const applySort = (
  column: ColumnType<ExecuteInventorizationRelocationTaskTableItem>,
  sort: ExecuteInventorizationRelocationTaskTableSortValue,
): ColumnType<ExecuteInventorizationRelocationTaskTableItem> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.dataIndex, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}

export const getSort = (
  field: SortableField,
  order: SortOrder,
): ExecuteInventorizationRelocationTaskTableSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}

export const parseSort = (
  value: ExecuteInventorizationRelocationTaskTableSortValue,
): { order: SortOrder; columnKey: SortableField } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey:
      sortValueToSortableField[parsedValue as ExecuteInventorizationRelocationTaskTableSortValue],
  }
}
