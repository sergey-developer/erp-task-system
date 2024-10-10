import { Flex, Table } from 'antd'
import { FC, useMemo } from 'react'

import { columns } from './columns'
import { applySort } from './sort'
import { DiscrepanciesEquipmentTableItem, DiscrepanciesEquipmentTableProps } from './types'

const DiscrepanciesEquipmentTable: FC<DiscrepanciesEquipmentTableProps> = ({ sort, ...props }) => {
  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySort(col, sort) : col)),
    [sort],
  )

  return (
    <Flex data-testid='discrepancies-equipment-table'>
      <Table<DiscrepanciesEquipmentTableItem>
        {...props}
        rowKey='id'
        columns={sortedColumns}
        showSorterTooltip={false}
      />
    </Flex>
  )
}

export default DiscrepanciesEquipmentTable
