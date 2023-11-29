import { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { getColumns } from './columns'
import { RelocationEquipmentTableItem, RelocationEquipmentTableProps } from './types'

const RelocationEquipmentTable: FC<RelocationEquipmentTableProps> = ({
  onClickImages,
  ...props
}) => {
  return (
    <div data-testid='relocation-equipment-table'>
      <ParentSizedTable<RelocationEquipmentTableItem>
        {...props}
        rowKey='id'
        columns={getColumns({ onClickImages })}
      />
    </div>
  )
}

export default RelocationEquipmentTable
