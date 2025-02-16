import { CreateEquipmentsBadRequestResponse } from 'features/equipments/api/schemas'
import React, { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { ADD_TEXT } from 'shared/constants/common'

import EquipmentsByFileTable from '../EquipmentsByFileTable'
import { EquipmentByFileTableRow, EquipmentsByFileTableProps } from '../EquipmentsByFileTable/types'

export type CreateEquipmentsByFileModalProps = Required<Pick<BaseModalProps, 'open' | 'onCancel'>> &
  Pick<EquipmentsByFileTableProps, 'onEdit'> & {
    data: EquipmentByFileTableRow[]
    errors?: CreateEquipmentsBadRequestResponse

    onCreate: () => Promise<void>
    isCreating: boolean
  }

const CreateEquipmentsByFileModal: FC<CreateEquipmentsByFileModalProps> = ({
  data,
  errors,

  onCreate,
  isCreating,

  onEdit,

  ...props
}) => {
  return (
    <BaseModal
      {...props}
      data-testid='create-equipments-by-file-modal'
      okText={ADD_TEXT}
      onOk={onCreate}
      confirmLoading={isCreating}
      width='100%'
      title='Оборудование из Excel'
    >
      <EquipmentsByFileTable dataSource={data} errors={errors} onEdit={onEdit} />
    </BaseModal>
  )
}

export default CreateEquipmentsByFileModal
