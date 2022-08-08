import { ColumnsType } from 'antd/es/table'

import { ScreenMap } from 'shared/interfaces/breakpoints'
import { MaybeUndefined } from 'shared/interfaces/utils'

import {
  AllColumnWidthMap,
  XxlColumnWidthMap,
  defaultColumnWidthMap,
  xxlColumnWidthMap,
} from '../constants/columnWidth'
import { TaskTableListItem } from '../interfaces'

const applyWidthToColumn = (
  columns: ColumnsType<TaskTableListItem>,
  breakpoints: ScreenMap,
): ColumnsType<TaskTableListItem> => {
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
