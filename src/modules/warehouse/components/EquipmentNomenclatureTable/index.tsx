import { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import {
  EquipmentNomenclatureTableProps,
  EquipmentNomenclatureTableItem,
} from './types'

const EquipmentNomenclatureTable: FC<EquipmentNomenclatureTableProps> = (
  props,
) => {
  return (
    <div data-testid='equipment-nomenclature-table'>
      <ParentSizedTable<EquipmentNomenclatureTableItem>
        {...props}
        rowKey='id'
        columns={columns}
      />
    </div>
  )
}

export default EquipmentNomenclatureTable
