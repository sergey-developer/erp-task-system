import { ColumnType } from 'antd/es/table'

import { ScreenMap } from 'shared/types/breakpoints'
import { MaybeUndefined } from 'shared/types/utils'

import {
  AllColumnWidthMap,
  defaultColumnWidthMap,
  XxlColumnWidthMap,
  xxlColumnWidthMap,
} from '../constants/columnWidth'
import { TaskTableListItem } from '../types'

export const applyWidthToColumn = (
  column: ColumnType<TaskTableListItem>,
  breakpoints: ScreenMap,
): ColumnType<TaskTableListItem> => {
  const defaultWidth = defaultColumnWidthMap[(column.key || column.dataIndex) as AllColumnWidthMap]

  const colWidth: MaybeUndefined<number> = breakpoints.xxl
    ? xxlColumnWidthMap[(column.key || column.dataIndex) as XxlColumnWidthMap] || defaultWidth
    : defaultWidth

  return {
    ...column,
    width: colWidth,
  }
}
