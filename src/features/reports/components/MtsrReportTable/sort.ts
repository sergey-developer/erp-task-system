import { ColumnType } from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface'
import isEqual from 'lodash/isEqual'

import { GetMtsrReportBaseSortKey, GetMtsrReportBaseSortValue } from 'features/reports/types'

import { SortOrderEnum } from 'shared/constants/sort'

import { MtsrReportTableItem } from './types'

export type SortableField = keyof Pick<
  MtsrReportTableItem,
  | 'id'
  | 'title'
  | 'averageExecutionTime'
  | 'returnedAmount'
  | 'allTasks'
  | 'completedTasks'
  | 'overdueTasks'
>

export const sortableFieldToSortValues: Record<
  SortableField,
  [GetMtsrReportBaseSortKey, Exclude<GetMtsrReportBaseSortValue, GetMtsrReportBaseSortKey>]
> = {
  id: ['id', '-id'],
  title: ['title', '-title'],
  averageExecutionTime: ['average_execution_time', '-average_execution_time'],
  returnedAmount: ['returned_amount', '-returned_amount'],
  allTasks: ['all_tasks', '-all_tasks'],
  completedTasks: ['completed_tasks', '-completed_tasks'],
  overdueTasks: ['overdue_tasks', '-overdue_tasks'],
}

export const sortValueToSortableField = Object.keys(sortableFieldToSortValues).reduce(
  (acc, field) => {
    const sortableField = field as SortableField
    const [ascendValue, descendValue] = sortableFieldToSortValues[sortableField]

    acc[ascendValue] = sortableField
    acc[descendValue] = sortableField

    return acc
  },
  {} as Record<GetMtsrReportBaseSortValue, SortableField>,
)

export const applySort = (
  column: ColumnType<MtsrReportTableItem>,
  sort: GetMtsrReportBaseSortValue,
): ColumnType<MtsrReportTableItem> => {
  const sorterResult = parseSort(sort)

  if (!isEqual(column.dataIndex, sorterResult.columnKey)) return column

  return {
    ...column,
    sortOrder: sorterResult.order,
  }
}

export const getSort = (field: SortableField, order: SortOrder): GetMtsrReportBaseSortValue => {
  const [ascendValue, descendValue] = sortableFieldToSortValues[field]
  return order === SortOrderEnum.Descend ? descendValue : ascendValue
}

export const parseSort = (
  value: GetMtsrReportBaseSortValue,
): { order: SortOrder; columnKey: SortableField } => {
  const isDescend = value.startsWith('-')
  const parsedValue = isDescend ? value.slice(1) : value

  return {
    order: isDescend ? SortOrderEnum.Descend : SortOrderEnum.Ascend,
    columnKey: sortValueToSortableField[parsedValue as GetMtsrReportBaseSortValue],
  }
}
