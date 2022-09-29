import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { ColumnsType } from 'antd/es/table'
import React, { FC, useMemo } from 'react'

import { sortableFieldConfig } from 'modules/task/features/TaskList/components/TaskListPage/constants'

import { tableColumns } from './constants/columns'
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
  rowClassName,
}) => {
  const breakpoints = useBreakpoint()

  const sortedColumns: ColumnsType<TaskTableListItem> = useMemo(() => {
    const sorterResult =
      (sorting &&
        sorting in sortableFieldConfig &&
        sortableFieldConfig[sorting]) ||
      undefined

    return applySortingToColumn(tableColumns, sorterResult)
  }, [sorting])

  const columns: ColumnsType<TaskTableListItem> = useMemo(
    () => applyWidthToColumn(sortedColumns, breakpoints),
    [breakpoints, sortedColumns],
  )

  return (
    <TableStyled<TaskTableListItem>
      data-testid='table-taskList'
      rowClassName={rowClassName}
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
