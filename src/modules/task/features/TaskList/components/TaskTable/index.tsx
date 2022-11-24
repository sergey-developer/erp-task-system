import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
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

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th
        onClick={(event) => {
          console.log('onClick: ', event)
        }}
        onClickCapture={(event) => {
          console.log(event.target)

          // @ts-ignore
          if (event.target.className.includes('ant-table-column-has-sorters')) {
            event.stopPropagation()
          }
        }}
        {...restProps}
      />
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
  const [columns, setColumns] = useState<ColumnsType<TaskTableListItem>>([])

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
    const columns: ColumnsType<TaskTableListItem> = tableColumns.map(
      (col, index) => {
        const sortedColumn = sort ? applySortToColumn(col, sort) : col
        const colWithModifiedWidth = applyWidthToColumn(
          sortedColumn,
          breakpoints,
        )

        return {
          ...colWithModifiedWidth,
          onHeaderCell: (col: ColumnsType<TaskTableListItem>[number]) => ({
            width: col.width,
            onResize: handleResize(index),
          }),
        }
      },
    )

    setColumns(columns)
  }, [breakpoints, sort])

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
