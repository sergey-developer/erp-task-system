import { ColumnsType } from 'antd/es/table'
import { SorterResult } from 'antd/es/table/interface'

import { TaskListItemModel } from 'modules/task/components/TaskList/models'
import { MaybeUndefined } from 'shared/interfaces/utils'

const applySortingToColumn = (
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

export default applySortingToColumn
