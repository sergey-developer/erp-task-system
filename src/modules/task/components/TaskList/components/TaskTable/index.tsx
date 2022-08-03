import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { ColumnsType } from 'antd/es/table'
import React, { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'
import { SMART_SORT_DIRECTIONS_TO_SORT_FIELDS } from 'modules/task/components/TaskList/components/TaskListPage/constants'
import { TaskListItemModel } from 'modules/task/components/TaskList/models'

import { TABLE_COLUMNS } from './constants/columns'
import { TaskTableProps } from './interfaces'
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

  const sortedColumns: ColumnsType<TaskListItemModel> = useMemo(() => {
    const sorterResult =
      (sorting &&
        sorting in SMART_SORT_DIRECTIONS_TO_SORT_FIELDS &&
        SMART_SORT_DIRECTIONS_TO_SORT_FIELDS[sorting]) ||
      undefined

    return applySortingToColumn(TABLE_COLUMNS, sorterResult)
  }, [sorting])

  const columns: ColumnsType<TaskListItemModel> = useMemo(
    () => applyWidthToColumn(sortedColumns, breakpoints),
    [breakpoints, sortedColumns],
  )

  return (
    <ParentSizedTable<TaskListItemModel>
      dataSource={dataSource}
      columns={columns}
      pagination={pagination && { ...pagination, position: ['bottomCenter'] }}
      loading={loading}
      rowKey='id'
      onRow={onRow}
      onChange={onChange}
      showSorterTooltip={false}
    />
  )
}

export default TaskTable
