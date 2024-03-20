import { Table } from 'antd'
import { FC, useMemo } from 'react'

import { getColumns } from './columns'
import { CallingReasonsTableItem, CallingReasonsTableProps } from './types'

const CallingReasonsTable: FC<CallingReasonsTableProps> = ({ onDelete, disabled, ...props }) => {
  const columns = useMemo(() => getColumns({ onDelete, disabled }), [disabled, onDelete])

  return (
    <div data-testid='calling-reasons-table'>
      <Table<CallingReasonsTableItem> {...props} rowKey='id' columns={columns} pagination={false} />
    </div>
  )
}

export default CallingReasonsTable
