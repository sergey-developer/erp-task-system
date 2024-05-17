import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { ColumnsType, ColumnType } from 'antd/es/table'
import isEmpty from 'lodash/isEmpty'
import { CSSProperties, forwardRef, useEffect, useMemo, useState } from 'react'
import { ResizableProps } from 'react-resizable'

import { DEFAULT_PAGE_SIZE } from 'modules/task/pages/TasksPage/constants'

import { localeConfig } from './constants/common'
import components from './constants/components'
import { TableStyled } from './styles'
import { TaskTableListItem, TaskTableProps } from './types'
import { applySortToColumn, applyWidthToColumn, getColumns } from './utils'

const tableWrapperStyles: Pick<CSSProperties, 'height'> = { height: 'calc(100vh - 320px)' }

const TaskTable = forwardRef<HTMLDivElement, TaskTableProps>(
  ({ sort, pagination, ...props }, ref) => {
    const breakpoints = useBreakpoint()
    const [columns, setColumns] = useState<ColumnsType<TaskTableListItem>>(getColumns())

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

    const paginationParams = useMemo(
      () => ({ ...pagination, defaultPageSize: DEFAULT_PAGE_SIZE }),
      [pagination],
    )

    return (
      <div data-testid='task-table' ref={ref} style={tableWrapperStyles}>
        <TableStyled<TaskTableListItem>
          {...props}
          components={components}
          columns={sortedColumns}
          rowKey='id'
          showSorterTooltip={false}
          locale={localeConfig}
          pagination={paginationParams}
        />
      </div>
    )
  },
)

export default TaskTable
