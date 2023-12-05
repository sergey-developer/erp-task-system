import React, { FC } from 'react'

import { EquipmentsByFileTemplateModel } from 'modules/warehouse/models'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { ADD_TEXT } from 'shared/constants/common'

import EquipmentsByFileTemplateTable from '../EquipmentsByFileTemplateTable'

export type CreateEquipmentsByFileTemplateModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'onOk'>
> & {
  data: EquipmentsByFileTemplateModel
}

const CreateEquipmentsByFileTemplateModal: FC<CreateEquipmentsByFileTemplateModalProps> = ({
  data,
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
      <EquipmentsByFileTemplateTable dataSource={data} />
    </BaseModal>
  )
}

export default CreateEquipmentsByFileTemplateModal
