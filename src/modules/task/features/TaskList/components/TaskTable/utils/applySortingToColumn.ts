import { ColumnsType } from 'antd/es/table'
import { SorterResult } from 'antd/es/table/interface'

import { MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

import { TaskTableListItem } from '../interfaces'

const applySortingToColumn = (
  columns: ColumnsType<TaskTableListItem>,
  sorterResult: MaybeUndefined<SorterResult<TaskTableListItem>>,
): ColumnsType<TaskTableListItem> => {
  if (!sorterResult) return columns
  return columns.map((field) => {
    if (isEqual(field.key, sorterResult.columnKey)) {
      return {
        ...field,
        sortOrder: sorterResult.order,
      }
    }
    return field
  })
}

export default applySortingToColumn
