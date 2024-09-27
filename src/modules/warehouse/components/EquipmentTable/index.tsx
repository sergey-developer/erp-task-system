import { Flex } from 'antd'
import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { applySort } from './sort'
import { EquipmentTableItem, EquipmentTableProps } from './types'

const EquipmentTable: FC<EquipmentTableProps> = ({ sort, ...props }) => {
  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySort(col, sort) : col)),
    [sort],
  )

  return (
    <Flex data-testid='equipment-table'>
      <ParentSizedTable<EquipmentTableItem>
        {...props}
        rowKey='id'
        columns={sortedColumns}
        showSorterTooltip={false}
      />
    </Flex>
  )
}

export default EquipmentTable
