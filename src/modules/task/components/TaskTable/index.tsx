import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { ColumnsType, ColumnType } from 'antd/es/table'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { ResizableProps } from 'react-resizable'

import { localeConfig } from './constants/common'
import tableComponents from './constants/components'
import { paginationConfig } from './constants/pagination'
import { TableStyled, TableWrapperStyled } from './styles'
import { TaskTableListItem, TaskTableProps } from './types'
import { applySortToColumn, applyWidthToColumn, getTableColumns } from './utils'

const TaskTable: FC<TaskTableProps> = ({ sort, pagination, userRole, ...props }) => {
  const breakpoints = useBreakpoint()
  const [columns, setColumns] = useState<ColumnsType<TaskTableListItem>>(getTableColumns(userRole))

  const handleResize =
    (index: number): ResizableProps['onResize'] =>
    (event, { size }) => {
      setColumns((prevColumns) => {
        const nextColumns = [...prevColumns]
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        }

        return nextColumns
      })
    }

  useEffect(() => {
    setColumns((prevColumns) =>
      prevColumns.map((col, index) => ({
        ...col,
        onHeaderCell: (col: ColumnType<TaskTableListItem>) => ({
          width: col.width,
          onResize: handleResize(index),
        }),
      })),
    )
  }, [])

  useEffect(() => {
    if (isEmpty(breakpoints)) return

    setColumns((prevColumns) => prevColumns.map((col) => applyWidthToColumn(col, breakpoints)))
  }, [breakpoints])

  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySortToColumn(col, sort) : col)),
    [columns, sort],
  )

  return (
    <TableWrapperStyled data-testid='task-table'>
      <TableStyled<TaskTableListItem>
        components={tableComponents}
        columns={sortedColumns}
        pagination={
          pagination && {
            ...paginationConfig,
            ...pagination,
          }
        }
        rowKey='id'
        showSorterTooltip={false}
        locale={localeConfig}
        {...props}
      />
    </TableWrapperStyled>
  )
}

export default TaskTable
