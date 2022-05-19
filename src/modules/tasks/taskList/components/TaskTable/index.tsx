import { Table, TablePaginationConfig } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { FC, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { Task } from 'modules/tasks/models'

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
  pagination,
}) => {
  const [tableHeight, setTableHeight] = useState(600)

  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    const { top } = ref.current.getBoundingClientRect()

    // normally TABLE_HEADER_HEIGHT would be 55.
    setTableHeight(window.innerHeight - top - 55 - 60)
  }, [ref])

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
      pagination={pagination}
      loading={loading}
      rowKey='id'
      onChange={onChange}
      scroll={{ y: tableHeight }}
    />
  )
}

export default TaskTable
