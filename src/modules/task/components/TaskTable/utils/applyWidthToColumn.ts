import { ColumnType } from 'antd/es/table'

import { ScreenMap } from 'shared/interfaces/breakpoints'
import { MaybeUndefined } from 'shared/interfaces/utils'

import {
  AllColumnWidthMap,
  XxlColumnWidthMap,
  defaultColumnWidthMap,
  xxlColumnWidthMap,
} from '../constants/columnWidth'
import { TaskTableListItem } from '../interfaces'

export const applyWidthToColumn = (
  column: ColumnType<TaskTableListItem>,
  breakpoints: ScreenMap,
): ColumnType<TaskTableListItem> => {
  const defaultWidth = defaultColumnWidthMap[column.key as AllColumnWidthMap]

  const colWidth: MaybeUndefined<number> = breakpoints.xxl
    ? xxlColumnWidthMap[column.key as XxlColumnWidthMap] || defaultWidth
    : defaultWidth

  return {
    ...column,
    width: colWidth,
  }
}
