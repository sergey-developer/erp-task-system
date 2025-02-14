import { Flex } from 'antd'
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
  onRow,
}) => {
  return (
    <BaseModal
      data-testid='equipment-relocation-history-modal'
      footer={null}
      width='90%'
      open={open}
      onCancel={onCancel}
      title='История заявок на перемещение'
    >
      <Flex data-testid='equipment-relocation-history-table'>
        <ParentSizedTable<EquipmentRelocationHistoryTableItem>
          loading={loading}
          dataSource={dataSource}
          rowKey='id'
          columns={columns}
          onRow={onRow}
        />
      </Flex>
    </BaseModal>
  )
}

export default EquipmentRelocationHistoryModal
