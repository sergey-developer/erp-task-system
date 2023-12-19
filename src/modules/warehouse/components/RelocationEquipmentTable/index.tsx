import { Table } from 'antd'
import { FC } from 'react'

import { getColumns } from './columns'
import { RelocationEquipmentTableItem, RelocationEquipmentTableProps } from './types'

const RelocationEquipmentTable: FC<RelocationEquipmentTableProps> = ({
  onClickImages,
  ...props
}) => {
  return (
    <div data-testid='relocation-equipment-table'>
      <Table<RelocationEquipmentTableItem>
        {...props}
        rowKey='id'
        columns={getColumns({ onClickImages })}
      />
    </div>
  )
}

export default RelocationEquipmentTable
