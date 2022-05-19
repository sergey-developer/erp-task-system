import { ColumnsType } from 'antd/es/table'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

import { Task } from 'modules/tasks/models'
import { CustomEvent } from 'shared/interfaces/utils'

import {
  ColumnsTypeContentEnum,
  PERCENT_LIMIT_TO_HANDLE_SCROLL,
  TABLE_COLUMNS_ETC,
  TABLE_COLUMNS_SHORT,
} from './constants'
import { TaskTableProps } from './interfaces'
import { TableStyled } from './styles'

const TaskTable: FC<TaskTableProps> = ({
  dataSource,
  loading,
  columns,
  heightContainer,
  onLoadMore,
  loadingData,
  onChange,
  onRow,
}) => {
  const columnsData: ColumnsType<Task> = useMemo(() => {
    switch (columns) {
      case ColumnsTypeContentEnum.All:
        return TABLE_COLUMNS_SHORT.concat(TABLE_COLUMNS_ETC)
      case ColumnsTypeContentEnum.Short:
        return TABLE_COLUMNS_SHORT
      default:
        return TABLE_COLUMNS_SHORT
    }
  }, [columns])

  const refTable = useRef<HTMLDivElement>(null)

  /** автоподгрузка страниц */
  useEffect(() => {
    const node = refTable?.current?.querySelector('.ant-table-body')

    const onScroll = (event: CustomEvent) => {
      if (!loadingData) {
        const { currentTarget: element } = event
        const perc =
          (element?.scrollTop /
            (element?.scrollHeight - element?.clientHeight)) *
          100
        if (perc >= PERCENT_LIMIT_TO_HANDLE_SCROLL) {
          onLoadMore()
          node?.removeEventListener('scroll', onScroll as EventListener)
        }
      }
    }

    if (node) {
      node.addEventListener('scroll', onScroll as EventListener)
    }
    return () => node?.removeEventListener('scroll', onScroll as EventListener)
  }, [loadingData, onLoadMore])

  /** установка скрола, под высоту внешнего блока - голова таблицы*/
  /** todo переделать на решение https://github.com/ankeetmaini/react-infinite-scroll-component */
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
      return
    }
    setScrollY(0)
    if (!loadingData) {
      onLoadMore()
    }
  }, [heightContainer, dataSource, onLoadMore, loadingData])

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
      onChange={onChange}
    />
  )
}

export default TaskTable
