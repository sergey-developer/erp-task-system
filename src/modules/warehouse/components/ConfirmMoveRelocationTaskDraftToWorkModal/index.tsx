import { Space, Typography } from 'antd'
import { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

const { Text } = Typography

export type ConfirmMoveRelocationTaskDraftToWorkModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel'>
> & {
  isLoading: boolean
  onConfirm: () => Promise<void>
}

const ConfirmMoveRelocationTaskDraftToWorkModal: FC<
  ConfirmMoveRelocationTaskDraftToWorkModalProps
> = ({ isLoading, onConfirm, ...props }) => {
  return (
    <BaseModal
      {...props}
      data-testid='confirm-transfer-draft-relocation-task-to-work-modal'
      title='Перевести черновик в работу'
      okText='Подтвердить'
      onOk={onConfirm}
      confirmLoading={isLoading}
    >
      <Space direction='vertical'>
        <Text>Вы уверены, что хотите перевести черновик в работу?</Text>
        <Text>Заявку на перемещение нельзя будет удалить</Text>
      </Space>
    </BaseModal>
  )
}

export default ConfirmMoveRelocationTaskDraftToWorkModal
