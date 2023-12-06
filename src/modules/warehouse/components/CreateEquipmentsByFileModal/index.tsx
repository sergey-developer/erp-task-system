import React, { FC } from 'react'

import { CreateEquipmentsBadRequestErrorResponse } from 'modules/warehouse/models'
import { ImportedEquipmentsByFile } from 'modules/warehouse/types'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { ADD_TEXT } from 'shared/constants/common'

import EquipmentsByFileTable from '../EquipmentsByFileTable'

export type CreateEquipmentsByFileModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel'>
> & {
  data: ImportedEquipmentsByFile
  errors?: CreateEquipmentsBadRequestErrorResponse

  onCreate: () => Promise<void>
  isCreating: boolean
}

const CreateEquipmentsByFileModal: FC<CreateEquipmentsByFileModalProps> = ({
  data,
  errors,

  onCreate,
  isCreating,

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
      <EquipmentsByFileTable dataSource={data} errors={errors} />
    </BaseModal>
  )
}

export default CreateEquipmentsByFileModal
