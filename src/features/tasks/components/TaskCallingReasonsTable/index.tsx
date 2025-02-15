import { Flex, Table } from 'antd'
import { FC, useMemo } from 'react'

import { getColumns } from './columns'
import { TaskCallingReasonsTableItem, TaskCallingReasonsTableProps } from './types'

const TaskCallingReasonsTable: FC<TaskCallingReasonsTableProps> = ({
  onDelete,
  disabled,
  ...props
}) => {
  const columns = useMemo(() => getColumns({ onDelete, disabled }), [disabled, onDelete])

  return (
    <Flex data-testid='task-calling-reasons-table'>
      <Table<TaskCallingReasonsTableItem>
        {...props}
        rowKey='id'
        columns={columns}
        pagination={false}
      />
    </Flex>
  )
}

export default TaskCallingReasonsTable
