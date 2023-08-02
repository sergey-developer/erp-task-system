import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { WarehouseTableItem, WarehouseTableProps } from './interfaces'
import { applySort } from './utils'

const WarehouseTable: FC<WarehouseTableProps> = ({ sort, ...props }) => {
  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySort(col, sort) : col)),
    [sort],
  )

  return (
    <div data-testid='warehouse-table'>
      <ParentSizedTable<WarehouseTableItem>
        {...props}
        rowKey='id'
        columns={sortedColumns}
        pagination={false}
        showSorterTooltip={false}
      />
    </div>
  )
}

export default WarehouseTable
