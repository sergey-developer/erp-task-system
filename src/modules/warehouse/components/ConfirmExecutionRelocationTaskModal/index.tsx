import { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

export type ConfirmExecutionRelocationTaskModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel'>
> & {
  isLoading: boolean
  onConfirm: () => Promise<void>
}

const ConfirmExecutionRelocationTaskModal: FC<ConfirmExecutionRelocationTaskModalProps> = ({
  isLoading,
  onConfirm,
  ...props
}) => {
  return (
    <BaseModal
      {...props}
      data-testid='confirm-execution-relocation-task-modal'
      title='Подтверждение выполнения'
      okText='Подтвердить выполнение'
      onOk={onConfirm}
      confirmLoading={isLoading}
    >
      Вы уверены, что хотите подтвердить выполнение заявки?
    </BaseModal>
  )
}

export default ConfirmExecutionRelocationTaskModal
