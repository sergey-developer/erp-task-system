import { ColumnsType } from 'antd/es/table'

import { TaskListItemModel } from 'modules/task/components/TaskList/models'
import { ScreenMap } from 'shared/interfaces/breakpoints'
import { MaybeUndefined } from 'shared/interfaces/utils'

import {
  AllColumnWidthMap,
  XxlColumnWidthMap,
  defaultColumnWidthMap,
  xxlColumnWidthMap,
} from '../constants/columnWidth'

const applyWidthToColumn = (
  columns: ColumnsType<TaskListItemModel>,
  breakpoints: ScreenMap,
): ColumnsType<TaskListItemModel> => {
  return columns.map((col) => {
    const colBreakpointWidth: MaybeUndefined<number> = breakpoints.xxl
      ? xxlColumnWidthMap[col.key as XxlColumnWidthMap]
      : undefined

    const colWidth =
      colBreakpointWidth || defaultColumnWidthMap[col.key as AllColumnWidthMap]

    return {
      ...col,
      width: colWidth,
    }
  })
}

export default applyWidthToColumn
