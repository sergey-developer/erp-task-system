import React, { FC } from 'react'

import { EquipmentsByFile } from 'modules/warehouse/types'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { ADD_TEXT } from 'shared/constants/common'

import EquipmentsByFileTable from '../EquipmentsByFileTable'

export type CreateEquipmentsByFileModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel'>
> & {
  data: EquipmentsByFile

  onCreate: (equipments: EquipmentsByFile) => Promise<void>
  isCreating: boolean
}

const CreateEquipmentsByFileModal: FC<CreateEquipmentsByFileModalProps> = ({
  data,
  onCreate,
  isCreating,
  ...props
}) => {
  return (
    <BaseModal
      {...props}
      data-testid='create-equipments-by-file-modal'
      okText={ADD_TEXT}
      onOk={() => onCreate(data)}
      confirmLoading={isCreating}
      width='100%'
      title='Оборудование из Excel'
    >
      <EquipmentsByFileTable dataSource={data} />
    </BaseModal>
  )
}

export default CreateEquipmentsByFileModal
