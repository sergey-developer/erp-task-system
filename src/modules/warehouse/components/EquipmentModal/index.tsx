import { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { EquipmentModalProps } from './types'

const EquipmentModal: FC<EquipmentModalProps> = () => {
  return (
    <BaseModal
      data-testid='equipment-modal'
      visible
      // title={modalTitle}
      // confirmLoading={isLoading}
      // onOk={form.submit}
      // okText={okBtnText}
      // onCancel={onCancel}
    ></BaseModal>
  )
}

export default EquipmentModal
