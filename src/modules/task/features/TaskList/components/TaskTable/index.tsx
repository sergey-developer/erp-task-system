import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC, useMemo } from 'react'

import { tableColumns } from './constants/columns'
import { localeConfig } from './constants/common'
import { paginationConfig } from './constants/pagination'
import { TaskTableListItem, TaskTableProps } from './interfaces'
import { TableStyled } from './styles'
import applySortToColumn from './utils/applySortToColumn'
import applyWidthToColumn from './utils/applyWidthToColumn'

const TaskTable: FC<TaskTableProps> = ({
  dataSource,
  loading,
  sort,
  onChange,
  onRow,
  pagination,
  rowClassName,
}) => {
  const breakpoints = useBreakpoint()

  const columns = useMemo(
    () =>
      tableColumns.map((col) => {
        const sortedColumn = sort ? applySortToColumn(col, sort) : col
        return applyWidthToColumn(sortedColumn, breakpoints)
      }),
    [breakpoints, sort],
  )

  return (
    <TableStyled<TaskTableListItem>
      data-testid='table-task-list'
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
