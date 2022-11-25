import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useEffect, useState } from 'react'
import { Resizable, ResizableProps } from 'react-resizable'

import { ColumnsType } from 'antd/lib/table'
import { TableComponents } from 'rc-table/lib/interface'

import { tableColumns } from './constants/columns'
import { localeConfig } from './constants/common'
import { paginationConfig } from './constants/pagination'
import { TaskTableListItem, TaskTableProps } from './interfaces'
import { TableStyled, TableWrapperStyled } from './styles'
import { applySortToColumn, applyWidthToColumn } from './utils'

const ResizeableTitle = (
  props: ColumnsType<TaskTableListItem> & ResizableProps,
) => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  const handleOnClickCapture = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement

    if (!target.className.includes('ant-table-column-title')) {
      event.stopPropagation()
    }
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} onClickCapture={handleOnClickCapture} />
    </Resizable>
  )
}

const customComponents: TableComponents<TaskTableListItem> = {
  header: {
    cell: ResizeableTitle,
  },
}

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
  const [columns, setColumns] =
    useState<ColumnsType<TaskTableListItem>>(tableColumns)

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

  // useEffect(() => {
  //   setColumns((prev) => {
  //     return [...prev].map((col, index) => {
  //       const sortedColumn = sort ? applySortToColumn(col, sort) : col
  //       const colWithModifiedWidth = applyWidthToColumn(
  //         sortedColumn,
  //         breakpoints,
  //       )
  //
  //       return {
  //         ...colWithModifiedWidth,
  //         onHeaderCell: (col: ColumnsType<TaskTableListItem>[number]) => ({
  //           width: col.width,
  //           onResize: handleResize(index),
  //         }),
  //       }
  //     })
  //   })
  // }, [breakpoints, sort])

  useEffect(() => {
    setColumns((prevColumns) =>
      [...prevColumns].map((col, index) => ({
        ...col,
        onHeaderCell: (col: ColumnsType<TaskTableListItem>[number]) => ({
          width: col.width,
          onResize: handleResize(index),
        }),
      })),
    )
  }, [])

  useEffect(() => {
    if (isEmpty(breakpoints)) return

    setColumns((prevColumns) =>
      [...prevColumns].map((col) => applyWidthToColumn(col, breakpoints)),
    )
  }, [breakpoints])

  useEffect(() => {
    setColumns((prevColumns) =>
      [...prevColumns].map((col) =>
        sort ? applySortToColumn(col, sort) : col,
      ),
    )
  }, [sort])

  return (
    <TableWrapperStyled data-testid='table-task-list'>
      <TableStyled<TaskTableListItem>
        components={customComponents}
        rowClassName={rowClassName}
        dataSource={dataSource}
        columns={columns}
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
