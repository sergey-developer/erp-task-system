import { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { WarehouseTableItem, WarehouseTableProps } from './interfaces'

const WarehouseTable: FC<WarehouseTableProps> = (props) => {
  return (
    <div data-testid='warehouse-table'>
      <ParentSizedTable<WarehouseTableItem>
        {...props}
        rowKey='id'
        columns={columns}
        pagination={false}
        showSorterTooltip={false}
      />
    </div>
  )
}

export default WarehouseTable
