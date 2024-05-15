import { Typography } from 'antd'
import React, { FC } from 'react'

import ConfirmModal, { ConfirmModalProps } from 'components/Modals/ConfirmModal'

const { Text } = Typography

export type ConfirmExecuteTaskRegistrationFNModalProps = Required<
  Pick<ConfirmModalProps, 'open' | 'onOk' | 'onCancel'>
>

const ConfirmExecuteTaskRegistrationFNModal: FC<ConfirmExecuteTaskRegistrationFNModalProps> = (
  props,
) => {
  return (
    <ConfirmModal
      data-testid='confirm-execute-task-registration-fn-modal'
      title='Регистрация ФН'
      {...props}
    >
      <Text>
        По заявке был направлен запрос на регистрацию ФН, но карточка еще не получена. Вы уверены,
        что хотите выполнить заявку?
      </Text>
    </ConfirmModal>
  )
}

export default ConfirmExecuteTaskRegistrationFNModal
