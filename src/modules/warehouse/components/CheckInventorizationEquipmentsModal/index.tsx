import React, { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { SAVE_TEXT } from 'shared/constants/common'

import CheckInventorizationEquipmentsTable from '../CheckInventorizationEquipmentsTable'
import { CheckInventorizationEquipmentsTableRow } from '../CheckInventorizationEquipmentsTable/types'

export type CheckInventorizationEquipmentsModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel'>
> & {
  data: CheckInventorizationEquipmentsTableRow[]
}

const CheckInventorizationEquipmentsModal: FC<CheckInventorizationEquipmentsModalProps> = ({
  data,
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
      <CheckInventorizationEquipmentsTable dataSource={data} />
    </BaseModal>
  )
}

export default CheckInventorizationEquipmentsModal
