import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/Table'
import React, { FC } from 'react'

// TODO: заменить any когда генерация типов будет готова
type TaskTableProps = Pick<
  TableProps<any>,
  'dataSource' | 'loading' | 'columns'
>

const TaskTable: FC<TaskTableProps> = ({ dataSource, loading, columns }) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      loading={loading}
    />
  )
}

export default TaskTable
