import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { applySort } from './sort'
import { EquipmentTableProps, EquipmentTableItem } from './types'

const EquipmentTable: FC<EquipmentTableProps> = ({ sort, ...props }) => {
  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySort(col, sort) : col)),
    [sort],
  )

  return (
    <div data-testid='equipment-table'>
      <ParentSizedTable<EquipmentTableItem>
        {...props}
        rowKey='id'
        columns={sortedColumns}
      />
    </div>
  )
}

export default EquipmentTable
