import { ColumnType } from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface'
import isEqual from 'lodash/isEqual'

import {
  GetRelocationTaskListSortKey,
  GetRelocationTaskListSortValue,
} from 'modules/warehouse/models'

import { SortOrderEnum } from 'shared/constants/sort'

import { RelocationTaskTableItem } from './types'

export type SortableField = keyof Pick<
  RelocationTaskTableItem,
  | 'id'
  | 'type'
  | 'deadlineAt'
  | 'relocateFrom'
  | 'relocateTo'
  | 'executor'
  | 'status'
  | 'createdBy'
  | 'createdAt'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [
    GetRelocationTaskListSortKey,
    Exclude<GetRelocationTaskListSortValue, GetRelocationTaskListSortKey>,
  ]
> = {
  id: ['id', '-id'],
  type: ['type', '-type'],
  deadlineAt: ['deadline_at', '-deadline_at'],
  relocateFrom: ['relocate_from', '-relocate_from'],
  relocateTo: ['relocate_to', '-relocate_to'],
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
  {} as Record<GetRelocationTaskListSortValue, SortableField>,
)

export const applySort = (
  column: ColumnType<RelocationTaskTableItem>,
  sort: GetRelocationTaskListSortValue,
): ColumnType<RelocationTaskTableItem> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.dataIndex, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}

export const getSort = (field: SortableField, order: SortOrder): GetRelocationTaskListSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}

export const parseSort = (
  value: GetRelocationTaskListSortValue,
): { order: SortOrder; columnKey: SortableField } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey: sortValueToSortableField[parsedValue as GetRelocationTaskListSortValue],
  }
}
