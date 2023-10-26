import { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { EquipmentRelocationHistoryModalProps, EquipmentRelocationHistoryTableItem } from './types'

const EquipmentRelocationHistoryModal: FC<EquipmentRelocationHistoryModalProps> = ({
  open,
  onCancel,
  loading,
  dataSource,
}) => {
  return (
    <BaseModal
      data-testid='equipment-relocation-history-modal'
      open={open}
      onCancel={onCancel}
      title='История заявок на перемещение'
    >
      <div data-testid='equipment-relocation-history-table'>
        <ParentSizedTable<EquipmentRelocationHistoryTableItem>
          loading={loading}
          dataSource={dataSource}
          rowKey='id'
          columns={columns}
        />
      </div>
    </BaseModal>
  )
}

export default EquipmentRelocationHistoryModal
