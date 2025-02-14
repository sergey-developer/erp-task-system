import React, { CSSProperties, forwardRef, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { applySort } from './sort'
import { InventorizationTableItem, InventorizationTableProps } from './types'

// todo: создать функционал для переиспользования
const tableWrapperStyles: Pick<CSSProperties, 'height'> = { height: 'calc(100vh - 245px)' }

const InventorizationTable = forwardRef<HTMLDivElement, InventorizationTableProps>(
  ({ sort, ...props }, ref) => {
    const sortedColumns = useMemo(
      () => columns.map((col) => (sort ? applySort(col, sort) : col)),
      [sort],
    )

    return (
      <div data-testid='inventorization-table' ref={ref} style={tableWrapperStyles}>
        <ParentSizedTable<InventorizationTableItem>
          {...props}
          rowKey='id'
          columns={sortedColumns}
          showSorterTooltip={false}
        />
      </div>
    )
  },
)

export default InventorizationTable
