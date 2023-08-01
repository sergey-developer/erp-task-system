import { ColumnsType } from 'antd/es/table'

import { ScreenMap } from 'shared/interfaces/breakpoints'
import { ArrayFirst, MaybeUndefined } from 'shared/interfaces/utils'

import {
  AllColumnWidthMap,
  XxlColumnWidthMap,
  defaultColumnWidthMap,
  xxlColumnWidthMap,
} from '../constants/columnWidth'
import { TaskTableListItem } from '../interfaces'

export const applyWidthToColumn = (
  column: ArrayFirst<ColumnsType<TaskTableListItem>>,
  breakpoints: ScreenMap,
): ArrayFirst<ColumnsType<TaskTableListItem>> => {
  const defaultWidth = defaultColumnWidthMap[column.key as AllColumnWidthMap]

  const colWidth: MaybeUndefined<number> = breakpoints.xxl
    ? xxlColumnWidthMap[column.key as XxlColumnWidthMap] || defaultWidth
    : defaultWidth

  return {
    ...column,
    width: colWidth,
  }
}
