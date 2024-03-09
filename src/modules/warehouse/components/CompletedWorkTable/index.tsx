import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { getColumns } from './columns'
import { CompletedWorkTableItem, CompletedWorkTableProps } from './types'

const CompletedWorkTable: FC<CompletedWorkTableProps> = ({ onDelete, ...props }) => {
  const columns = useMemo(() => getColumns({ onDelete }), [onDelete])

  return (
    <div data-testid='completed-work-table'>
      <ParentSizedTable<CompletedWorkTableItem>
        {...props}
        rowKey='id'
        columns={columns}
        pagination={false}
      />
    </div>
  )
}

export default CompletedWorkTable
