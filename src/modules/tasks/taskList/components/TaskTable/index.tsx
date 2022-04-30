import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/Table'
import React, { FC } from 'react'

import { tableColumns } from './constants'

type TaskTableProps = Pick<TableProps<any>, 'dataSource' | 'loading'>

const TaskTable: FC<TaskTableProps> = ({ dataSource, loading }) => {
  return (
    <Table
      dataSource={dataSource}
      columns={tableColumns}
      pagination={false}
      loading={loading}
    />
  )
}

export default TaskTable
