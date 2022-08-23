import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { ColumnsType } from 'antd/es/table'
import React, { FC, useMemo } from 'react'

import { SMART_SORT_DIRECTIONS_TO_SORT_FIELDS } from 'modules/task/components/TaskList/components/TaskListPage/constants'

import { TABLE_COLUMNS } from './constants/columns'
import { localeConfig } from './constants/locale'
import { paginationConfig } from './constants/pagination'
import { TaskTableListItem, TaskTableProps } from './interfaces'
import { TableStyled } from './styles'
import applySortingToColumn from './utils/applySortingToColumn'
import applyWidthToColumn from './utils/applyWidthToColumn'

const TaskTable: FC<TaskTableProps> = ({
  dataSource,
  loading,
  sorting,
  onChange,
  onRow,
  pagination,
}) => {
  const breakpoints = useBreakpoint()

  const sortedColumns: ColumnsType<TaskTableListItem> = useMemo(() => {
    const sorterResult =
      (sorting &&
        sorting in SMART_SORT_DIRECTIONS_TO_SORT_FIELDS &&
        SMART_SORT_DIRECTIONS_TO_SORT_FIELDS[sorting]) ||
      undefined

    return applySortingToColumn(TABLE_COLUMNS, sorterResult)
  }, [sorting])

  const columns: ColumnsType<TaskTableListItem> = useMemo(
    () => applyWidthToColumn(sortedColumns, breakpoints),
    [breakpoints, sortedColumns],
  )

  return (
    <TableStyled<TaskTableListItem>
      dataSource={dataSource}
      columns={columns}
      pagination={
        pagination && {
          ...pagination,
          ...paginationConfig,
        }
      }
      loading={loading}
      rowKey='id'
      onRow={onRow}
      onChange={onChange}
      showSorterTooltip={false}
      locale={localeConfig}
    />
  )
}

export default TaskTable
