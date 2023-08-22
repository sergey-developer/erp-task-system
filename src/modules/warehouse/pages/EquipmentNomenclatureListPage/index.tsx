import { FC } from 'react'

import EquipmentNomenclatureTable from 'modules/warehouse/components/EquipmentNomenclatureTable'

const EquipmentNomenclatureListPage: FC = () => {
  return (
    <div data-testid='equipment-nomenclature-list-page'>
      <EquipmentNomenclatureTable
        dataSource={[]}
        onChange={() => {}}
        loading={false}
      />
    </div>
  )
}

export default EquipmentNomenclatureListPage
