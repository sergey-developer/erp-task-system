import React, { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { SAVE_TEXT } from 'shared/constants/common'

import CheckInventorizationEquipmentsTable from '../CheckInventorizationEquipmentsTable'
import {
  CheckInventorizationEquipmentsTableProps,
  CheckInventorizationEquipmentsTableRow,
} from '../CheckInventorizationEquipmentsTable/types'

export type CheckInventorizationEquipmentsModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel'>
> &
  Pick<CheckInventorizationEquipmentsTableProps, 'onClickEdit' | 'editTouchedRowsIds'> & {
    data: CheckInventorizationEquipmentsTableRow[]
  }

const CheckInventorizationEquipmentsModal: FC<CheckInventorizationEquipmentsModalProps> = ({
  data,
  onClickEdit,
  editTouchedRowsIds,
  ...props
}) => {
  return (
    <BaseModal
      {...props}
      data-testid='check-inventorization-equipments-modal'
      okText={SAVE_TEXT}
      onOk={() => {}}
      confirmLoading={false}
      width='80%'
      title='Результаты загрузки оборудования из Excel'
    >
      <CheckInventorizationEquipmentsTable
        dataSource={data}
        onClickEdit={onClickEdit}
        editTouchedRowsIds={editTouchedRowsIds}
      />
    </BaseModal>
  )
}

export default CheckInventorizationEquipmentsModal
