import { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { EquipmentTableProps, EquipmentTableItem } from './types'

const EquipmentTable: FC<EquipmentTableProps> = (props) => {
  return (
    <div data-testid='equipment-table'>
      <ParentSizedTable<EquipmentTableItem>
        {...props}
        rowKey='id'
        columns={columns}
      />
    </div>
  )
}

export default EquipmentTable
