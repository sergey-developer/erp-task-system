import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { FC, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { Task } from 'modules/tasks/models'
import { SMART_SORT_DIRECTIONS_TO_SORT_FIELDS } from 'modules/tasks/taskList/components/TaskListPage/constants'
import { getElementFullHeight } from 'shared/utils/getElementFullHeight'

import { TABLE_COLUMNS } from './constants'
import { TaskTableProps } from './interfaces'
import { applySortingToColumn } from './utils'

const TaskTable: FC<TaskTableProps> = ({
  dataSource,
  loading,
  sorting,
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
    const sorterResult =
      (sorting &&
        sorting in SMART_SORT_DIRECTIONS_TO_SORT_FIELDS &&
        SMART_SORT_DIRECTIONS_TO_SORT_FIELDS[sorting]) ||
      undefined
    return applySortingToColumn(TABLE_COLUMNS, sorterResult)
  }, [sorting])

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
