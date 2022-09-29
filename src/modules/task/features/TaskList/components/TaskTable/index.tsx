import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC } from 'react'

import { tableColumns } from './constants/columns'
import { localeConfig } from './constants/locale'
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

  const columns = tableColumns.map((col) => {
    const sortedColumn = sort ? applySortToColumn(col, sort) : col
    return applyWidthToColumn(sortedColumn, breakpoints)
  })

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
