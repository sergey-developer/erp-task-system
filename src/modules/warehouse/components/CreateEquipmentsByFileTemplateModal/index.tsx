import React, { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { ADD_TEXT } from 'shared/constants/common'

import EquipmentsByFileTemplateTable from '../EquipmentsByFileTemplateTable'
import { EquipmentsByFileTemplateTableProps } from '../EquipmentsByFileTemplateTable/types'

export type CreateEquipmentsByFileTemplateModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'onOk'>
> &
  Pick<EquipmentsByFileTemplateTableProps, 'dataSource'>

const CreateEquipmentsByFileTemplateModal: FC<CreateEquipmentsByFileTemplateModalProps> = ({
  dataSource,
  ...props
}) => {
  return (
    <BaseModal
      {...props}
      data-testid='create-equipments-by-file-template-modal'
      okText={ADD_TEXT}
      width='100%'
      title='Оборудование из Excel'
    >
      <EquipmentsByFileTemplateTable dataSource={dataSource} />
    </BaseModal>
  )
}

export default CreateEquipmentsByFileTemplateModal
