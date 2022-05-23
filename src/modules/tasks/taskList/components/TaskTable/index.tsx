import { ColumnsType } from 'antd/es/table'
import React, { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/ParentSizedTable'
import { Task } from 'modules/tasks/taskList/models'

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
    <ParentSizedTable<Task>
      dataSource={dataSource}
      columns={columnsData}
      pagination={pagination && { ...pagination, position: ['bottomCenter'] }}
      loading={loading}
      rowKey='id'
      onRow={onRow}
      onChange={onChange}
    />
  )
}

export default TaskTable
