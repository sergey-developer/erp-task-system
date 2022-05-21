import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { FC, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { Task } from 'modules/tasks/models'
import { getElementFullHeight } from 'shared/utils/getElementFullHeight'

import {
  ColumnsTypeContentEnum,
  TABLE_COLUMNS_ETC,
  TABLE_COLUMNS_SHORT,
} from './constants'
import { TaskTableProps } from './interfaces'

const TaskTable: FC<TaskTableProps> = ({
  dataSource,
  loading,
  columns,
  onChange,
  onRow,
  pagination,
}) => {
  const [tableHeight, setTableHeight] = useState<'auto' | number>('auto')

  const ref = useRef<HTMLDivElement>(null)

  /**
   * AntD таблица не умеет подстраиваться под высоту родителя
   * Чтобы таблица заняла всю доступную высоту требуется провести вычисления
   * Т.к. отрисовка пагинации зависит от наличия данных, добавлена зависимость
   * эффекта от наличия DataSource
   * todo: переопределять размеры тела таблицы при ресайзе экрана
   * todo: уменьшить частоту переопределений размеров: 1. при ресайзе с помощью trottle 2. из-за зависимости от dataSource  держать флаг внутри рефы вычислялся ли уже размер
   */

  useLayoutEffect(() => {
    if (!ref.current || !dataSource) {
      return
    }

    const tableTopOffset = ref.current.getBoundingClientRect().top

    const headerEl =
      ref.current.querySelector<HTMLDivElement>('.ant-table-header')

    const paginationEl = ref.current.querySelector<HTMLUListElement>(
      '.ant-table-pagination',
    )

    const headerHeight = headerEl ? getElementFullHeight(headerEl) : 0

    const paginationHeight = paginationEl
      ? getElementFullHeight(paginationEl)
      : 0

    setTableHeight(
      window.innerHeight - tableTopOffset - headerHeight - paginationHeight,
    )
  }, [dataSource])

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

  return (
    <Table
      ref={ref}
      dataSource={dataSource}
      columns={columnsData}
      pagination={pagination && { ...pagination, position: ['bottomLeft'] }}
      loading={loading}
      rowKey='id'
      onRow={onRow}
      onChange={onChange}
      scroll={{ y: tableHeight }}
    />
  )
}

export default TaskTable
