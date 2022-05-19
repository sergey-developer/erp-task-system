import { ColumnsType } from 'antd/es/table'
import { TableProps } from 'antd/lib/table/Table'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

import { Task } from 'modules/tasks/models'

import { TABLE_COLUMNS_ETC, TABLE_COLUMNS_SHORT } from './constants'
import { TableStyled } from './styles'

export type TaskTableProps = Pick<
  TableProps<Task>,
  'dataSource' | 'loading' | 'onRow'
> & {
  columns: 'all' | 'shorts'
  heightContainer: number
  onLoadMore: () => void
  loadingData: boolean
}

const TaskTable: FC<TaskTableProps> = ({
  dataSource,
  loading,
  columns,
  heightContainer,
  onLoadMore,
  loadingData,
  onRow,
}) => {
  const columnsData: ColumnsType<Task> = useMemo(() => {
    switch (columns) {
      case 'all':
        return TABLE_COLUMNS_SHORT.concat(TABLE_COLUMNS_ETC)
      case 'shorts':
        return TABLE_COLUMNS_SHORT
      default:
        return TABLE_COLUMNS_SHORT
    }
  }, [columns])

  const refTable = useRef(null)

  /** автоподгрузка страниц */
  useEffect(() => {
    const node = (
      refTable?.current as unknown as HTMLDivElement
    )?.querySelector<HTMLElement>('.ant-table-body')

    const onScroll = (e: Event) => {
      if (!loadingData) {
        const { currentTarget: element } = e
        const perc =
          ((element as unknown as HTMLDivElement)?.scrollTop /
            ((element as unknown as HTMLDivElement)?.scrollHeight -
              (element as unknown as HTMLDivElement)?.clientHeight)) *
          100
        if (perc >= 80) {
          onLoadMore()
          node?.removeEventListener('scroll', onScroll)
        }
      }
    }

    if (node) {
      node.addEventListener('scroll', onScroll)
    }
    return () => node?.removeEventListener('scroll', onScroll)
  }, [loadingData, onLoadMore])

  /** установка скролла, под высоту внешнего блока - голова таблицы*/
  const [scrollY, setScrollY] = useState<number>()

  useEffect(() => {
    const { offsetHeight: tableBodyHeight } = (
      refTable?.current as unknown as HTMLDivElement
    )?.querySelector('.ant-table-tbody') as HTMLDivElement
    const { offsetHeight: tableHeadHeight } = (
      refTable?.current as unknown as HTMLDivElement
    )?.querySelector('.ant-table-thead') as HTMLDivElement

    if (tableBodyHeight + tableHeadHeight > heightContainer) {
      setScrollY(heightContainer - tableHeadHeight)
    } else {
      setScrollY(0)
      if (!loadingData) {
        onLoadMore()
      }
    }
  }, [heightContainer, dataSource, onLoadMore])

  return (
    <TableStyled
      ref={refTable}
      dataSource={dataSource}
      columns={columnsData}
      pagination={false}
      loading={loading}
      onRow={onRow}
      rowKey='id'
      scroll={scrollY ? { y: scrollY } : { y: 'auto' }}
    />
  )
}

export default TaskTable
