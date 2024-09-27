import { Flex } from 'antd'
import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { applySort } from './sort'
import { WarehouseTableItem, WarehouseTableProps } from './types'

const WarehouseTable: FC<WarehouseTableProps> = ({ sort, ...props }) => {
  const sortedColumns = useMemo(
    () => columns.map((col) => (sort ? applySort(col, sort) : col)),
    [sort],
  )

  return (
    <Flex data-testid='warehouse-table'>
      <ParentSizedTable<WarehouseTableItem>
        {...props}
        rowKey='id'
        columns={sortedColumns}
        pagination={false}
        showSorterTooltip={false}
      />
    </Flex>
  )
}

export default WarehouseTable
