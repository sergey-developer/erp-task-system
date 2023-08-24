import { FC } from 'react'

import EquipmentTable from 'modules/warehouse/components/EquipmentTable'

const EquipmentListPage: FC = () => {
  return (
    <div data-testid='equipment-list-page'>
      <EquipmentTable
        dataSource={[]}
        pagination={false}
        loading={false}
        onChange={() => {}}
      />
    </div>
  )
}

export default EquipmentListPage
