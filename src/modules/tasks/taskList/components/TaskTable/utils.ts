import { ColumnsType } from 'antd/es/table'
import { SorterResult } from 'antd/es/table/interface'
import moment from 'moment'

import { Assignee, Task } from 'modules/tasks/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'

export const getDateTimeString = (value: string): string => {
  if (!value) return ''
  const momentTime = moment(value)
  return momentTime.isValid()
    ? momentTime.format(DATE_TIME_FORMAT)
    : 'Некорректная дата'
}

export const getFIOString = (value: MaybeNull<Assignee>): string =>
  value
    ? `${value.lastName} ${value.firstName.charAt(0)}.${
        value?.middleName ? value.middleName.charAt(0) + '.' : ''
      }`
    : ''

export const applySortingToColumn = (
  columns: ColumnsType<Task>,
  sorterResult: MaybeUndefined<SorterResult<Task>>,
): ColumnsType<Task> => {
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
