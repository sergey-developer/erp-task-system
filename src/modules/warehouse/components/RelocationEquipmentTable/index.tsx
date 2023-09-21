import { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { RelocationEquipmentTableProps, RelocationEquipmentTableItem } from './types'

const RelocationEquipmentTable: FC<RelocationEquipmentTableProps> = (props) => {
  return (
    <div data-testid='relocation-equipment-table'>
      <ParentSizedTable<RelocationEquipmentTableItem> {...props} rowKey='id' columns={columns} />
    </div>
  )
}

export default RelocationEquipmentTable
