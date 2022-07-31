import { ColumnsType } from 'antd/es/table'

import { TaskListItemModel } from 'modules/task/components/TaskList/models'
import { ScreenMap } from 'shared/interfaces/breakpoints'
import { MaybeUndefined } from 'shared/interfaces/utils'

import {
  AllColumnWidthMapKeys,
  XxlColumnWidthMapKeys,
  defaultColumnWidthMap,
  xxlColumnWidthMap,
} from '../constants/columnWidth'

const applyWidthToColumn = (
  columns: ColumnsType<TaskListItemModel>,
  breakpoints: ScreenMap,
): ColumnsType<TaskListItemModel> => {
  return columns.map((col) => {
    const colKey = col.key
    const colBreakpointWidth: MaybeUndefined<number> = breakpoints.xxl
      ? xxlColumnWidthMap[colKey as XxlColumnWidthMapKeys]
      : defaultColumnWidthMap[colKey as AllColumnWidthMapKeys]
    const colWidth = colBreakpointWidth || col.width

    return {
      ...col,
      width: colWidth,
    }
  })
}

export default applyWidthToColumn
