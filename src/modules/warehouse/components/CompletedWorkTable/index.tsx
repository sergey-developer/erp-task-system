import { Table } from 'antd'
import { FC, useMemo } from 'react'

import { getColumns } from './columns'
import { CompletedWorkTableItem, CompletedWorkTableProps } from './types'

const CompletedWorkTable: FC<CompletedWorkTableProps> = ({ onDelete, disabled, ...props }) => {
  const columns = useMemo(() => getColumns({ onDelete, disabled }), [onDelete, disabled])

  return (
    <div data-testid='completed-work-table'>
      <Table<CompletedWorkTableItem> {...props} rowKey='id' columns={columns} pagination={false} />
    </div>
  )
}

export default CompletedWorkTable
