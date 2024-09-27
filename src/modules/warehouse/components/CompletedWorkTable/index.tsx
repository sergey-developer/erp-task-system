import { Flex, Table } from 'antd'
import { FC, useMemo } from 'react'

import { getColumns } from './columns'
import { CompletedWorkTableItem, CompletedWorkTableProps } from './types'

const CompletedWorkTable: FC<CompletedWorkTableProps> = ({ onDelete, disabled, ...props }) => {
  const columns = useMemo(() => getColumns({ onDelete, disabled }), [onDelete, disabled])

  return (
    <Flex data-testid='completed-work-table'>
      <Table<CompletedWorkTableItem> {...props} rowKey='id' columns={columns} pagination={false} />
    </Flex>
  )
}

export default CompletedWorkTable
