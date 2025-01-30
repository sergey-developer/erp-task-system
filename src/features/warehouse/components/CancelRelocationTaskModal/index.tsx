import { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

export type CancelRelocationTaskModalProps = Required<Pick<BaseModalProps, 'open' | 'onCancel'>> & {
  isLoading: boolean
  onConfirm: () => Promise<void>
}

const CancelRelocationTaskModal: FC<CancelRelocationTaskModalProps> = ({
  isLoading,
  onConfirm,
  ...props
}) => {
  return (
    <BaseModal
      {...props}
      data-testid='cancel-relocation-task-modal'
      title='Отмена заявки'
      okText='Отменить заявку'
      onOk={onConfirm}
      confirmLoading={isLoading}
    >
      Вы уверены, что хотите отменить заявку?
    </BaseModal>
  )
}

export default CancelRelocationTaskModal
