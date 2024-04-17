import { ColumnType } from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface'
import isEqual from 'lodash/isEqual'

import { GetInventorizationsSortKey, GetInventorizationsSortValue } from 'modules/warehouse/models'

import { SortOrderEnum } from 'shared/constants/sort'

import { InventorizationTableItem } from './types'

export type SortableField = keyof Pick<
  InventorizationTableItem,
  'type' | 'deadlineAt' | 'executor' | 'status' | 'createdBy' | 'createdAt'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [GetInventorizationsSortKey, Exclude<GetInventorizationsSortValue, GetInventorizationsSortKey>]
> = {
  type: ['type', '-type'],
  deadlineAt: ['deadline_at', '-deadline_at'],
  executor: ['executor', '-executor'],
  status: ['status', '-status'],
  createdBy: ['created_by', '-created_by'],
  createdAt: ['created_at', '-created_at'],
}

export const sortValueToSortableField = Object.keys(sortableFieldToSortValues).reduce(
  (acc, field) => {
    const sortableField = field as SortableField
    const [ascendValue, descendValue] = sortableFieldToSortValues[sortableField]

    acc[ascendValue] = sortableField
    acc[descendValue] = sortableField

    return acc
  },
  {} as Record<GetInventorizationsSortValue, SortableField>,
)

export const applySort = (
  column: ColumnType<InventorizationTableItem>,
  sort: GetInventorizationsSortValue,
): ColumnType<InventorizationTableItem> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.dataIndex, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}

export const getSort = (field: SortableField, order: SortOrder): GetInventorizationsSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}

export const parseSort = (
  value: GetInventorizationsSortValue,
): { order: SortOrder; columnKey: SortableField } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey: sortValueToSortableField[parsedValue as GetInventorizationsSortValue],
  }
}
