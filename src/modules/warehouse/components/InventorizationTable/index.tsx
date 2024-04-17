import React, { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { applySort } from './sort'
import { InventorizationTableItem, InventorizationTableProps } from './types'

const InventorizationTable: FC<InventorizationTableProps> = ({ sort, ...props }) => {
  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySort(col, sort) : col)),
    [sort],
  )

  return (
    <div data-testid='inventorization-table'>
      <ParentSizedTable<InventorizationTableItem>
        {...props}
        rowKey='id'
        columns={sortedColumns}
        showSorterTooltip={false}
      />
    </div>
  )
}

export default InventorizationTable
