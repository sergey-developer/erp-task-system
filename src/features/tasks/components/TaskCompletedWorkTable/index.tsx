import { Flex, Table } from 'antd'
import { FC, useMemo } from 'react'

import { getColumns } from './columns'
import { TaskCompletedWorkTableItem, TaskCompletedWorkTableProps } from './types'

const TaskCompletedWorkTable: FC<TaskCompletedWorkTableProps> = ({
  onDelete,
  disabled,
  ...props
}) => {
  const columns = useMemo(() => getColumns({ onDelete, disabled }), [onDelete, disabled])

  return (
    <Flex data-testid='task-completed-work-table'>
      <Table<TaskCompletedWorkTableItem>
        {...props}
        rowKey='id'
        columns={columns}
        pagination={false}
      />
    </Flex>
  )
}

export default TaskCompletedWorkTable
