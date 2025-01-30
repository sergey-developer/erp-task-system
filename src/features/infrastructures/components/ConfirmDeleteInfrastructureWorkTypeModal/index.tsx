import React, { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

export type ConfirmDeleteInfrastructureWorkTypeModalProps = Pick<
  BaseModalProps,
  'open' | 'confirmLoading' | 'onOk' | 'onCancel'
>

const ConfirmDeleteInfrastructureWorkTypeModal: FC<
  ConfirmDeleteInfrastructureWorkTypeModalProps
> = (props) => {
  return (
    <BaseModal
      {...props}
      data-testid='confirm-delete-infrastructure-work-type-modal'
      title='Удаление работ'
      okText='Удалить'
    >
      Вы уверены, что хотите удалить данные работы?
    </BaseModal>
  )
}

export default ConfirmDeleteInfrastructureWorkTypeModal
