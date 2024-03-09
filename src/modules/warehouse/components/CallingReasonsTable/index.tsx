import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { getColumns } from './columns'
import { CallingReasonsTableItem, CallingReasonsTableProps } from './types'

const CallingReasonsTable: FC<CallingReasonsTableProps> = ({ onDelete, ...props }) => {
  const columns = useMemo(() => getColumns({ onDelete }), [onDelete])

  return (
    <div data-testid='calling-reasons-table'>
      <ParentSizedTable<CallingReasonsTableItem>
        {...props}
        rowKey='id'
        columns={columns}
        pagination={false}
      />
    </div>
  )
}

export default CallingReasonsTable
