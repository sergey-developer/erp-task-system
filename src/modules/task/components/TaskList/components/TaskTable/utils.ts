import { ColumnsType } from 'antd/es/table'
import { SorterResult } from 'antd/es/table/interface'

import { TaskListItemModel } from 'modules/task/components/TaskList/models'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'

export const getFIOString = (
  value: MaybeNull<TaskListItemModel['assignee']>,
): string =>
  value
    ? `${value.lastName} ${value.firstName.charAt(0)}.${
        value?.middleName ? value.middleName.charAt(0) + '.' : ''
      }`
    : ''

export const applySortingToColumn = (
  columns: ColumnsType<TaskListItemModel>,
  sorterResult: MaybeUndefined<SorterResult<TaskListItemModel>>,
): ColumnsType<TaskListItemModel> => {
  if (!sorterResult) return columns
  return columns.map((field) => {
    if (field.key === sorterResult.columnKey) {
      return {
        ...field,
        sortOrder: sorterResult.order,
      }
    }
    return field
  })
}
