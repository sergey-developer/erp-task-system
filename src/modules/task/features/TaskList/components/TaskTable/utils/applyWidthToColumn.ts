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
  column: ColumnsType<TaskTableListItem>[number],
  breakpoints: ScreenMap,
): ColumnsType<TaskTableListItem>[number] => {
  const colBreakpointWidth: MaybeUndefined<number> = breakpoints.xxl
    ? xxlColumnWidthMap[column.key as XxlColumnWidthMap]
    : undefined

  const colWidth =
    colBreakpointWidth || defaultColumnWidthMap[column.key as AllColumnWidthMap]

  return {
    ...column,
    width: colWidth,
  }
}

export default applyWidthToColumn
