import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { ColumnsType } from 'antd/es/table'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { ResizableProps } from 'react-resizable'

import { ArrayItem } from 'shared/interfaces/utils'

import { localeConfig } from './constants/common'
import tableComponents from './constants/components'
import { paginationConfig } from './constants/pagination'
import { TaskTableListItem, TaskTableProps } from './interfaces'
import { TableStyled, TableWrapperStyled } from './styles'
import { applySortToColumn, applyWidthToColumn, getTableColumns } from './utils'

const TaskTable: FC<TaskTableProps> = ({
  dataSource,
  loading,
  sort,
  onChange,
  onRow,
  pagination,
  rowClassName,
  userRole,
}) => {
  const breakpoints = useBreakpoint()
  const [columns, setColumns] = useState<ColumnsType<TaskTableListItem>>(
    getTableColumns(userRole),
  )

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
        onHeaderCell: (col: ArrayItem<ColumnsType<TaskTableListItem>>) => ({
          width: col.width,
          onResize: handleResize(index),
        }),
      })),
    )
  }, [])

  useEffect(() => {
    if (isEmpty(breakpoints)) return

    setColumns((prevColumns) =>
      prevColumns.map((col) => applyWidthToColumn(col, breakpoints)),
    )
  }, [breakpoints])

  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySortToColumn(col, sort) : col)),
    [columns, sort],
  )

  return (
    <TableWrapperStyled data-testid='table-task-list'>
      <TableStyled<TaskTableListItem>
        components={tableComponents}
        rowClassName={rowClassName}
        dataSource={dataSource}
        columns={sortedColumns}
        pagination={
          pagination && {
            ...paginationConfig,
            ...pagination,
          }
        }
        loading={loading}
        rowKey='id'
        onRow={onRow}
        onChange={onChange}
        showSorterTooltip={false}
        locale={localeConfig}
      />
    </TableWrapperStyled>
  )
}

export default TaskTable
