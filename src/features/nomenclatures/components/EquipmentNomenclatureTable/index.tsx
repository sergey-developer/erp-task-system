import { Flex } from 'antd'
import { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { EquipmentNomenclatureTableItem, EquipmentNomenclatureTableProps } from './types'

const EquipmentNomenclatureTable: FC<EquipmentNomenclatureTableProps> = (props) => {
  return (
    <Flex data-testid='equipmentDetail-nomenclature-table'>
      <ParentSizedTable<EquipmentNomenclatureTableItem> {...props} rowKey='id' columns={columns} />
    </Flex>
  )
}

export default EquipmentNomenclatureTable
