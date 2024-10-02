import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { applySort } from './sort'
import {
  ExecuteInventorizationRelocationTaskTableItem,
  ExecuteInventorizationRelocationTaskTableProps,
} from './types'

const ExecuteInventorizationRelocationTaskTable: FC<
  ExecuteInventorizationRelocationTaskTableProps
> = ({ sort, ...props }) => {
  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySort(col, sort) : col)),
    [sort],
  )

  return (
    <div data-testid='execute-inventorization-relocation-task-table'>
      <ParentSizedTable<ExecuteInventorizationRelocationTaskTableItem>
        {...props}
        rowKey='id'
        columns={sortedColumns}
        showSorterTooltip={false}
      />
    </div>
  )
}

export default ExecuteInventorizationRelocationTaskTable
