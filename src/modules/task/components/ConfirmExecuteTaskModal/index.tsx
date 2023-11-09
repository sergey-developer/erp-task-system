import { Typography } from 'antd'
import React, { FC } from 'react'

import { TaskModel } from 'modules/task/models'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { CONFIRM_TEXT } from 'shared/constants/common'
import { EmptyFn } from 'shared/types/utils'

const { Text, Link } = Typography

export type ConfirmExecuteTaskModalProps = Required<Pick<BaseModalProps, 'open'>> &
  Pick<TaskModel, 'recordId'> & {
    onConfirm: EmptyFn
    onCancel: NonNullable<BaseModalProps['onCancel']>
  }

const ConfirmExecuteTaskModal: FC<ConfirmExecuteTaskModalProps> = ({
  open,
  onConfirm,
  onCancel,

  recordId,
}) => {
  return (
    <BaseModal
      data-testid='confirm-execute-task-modal'
      open={open}
      title={
        <Text>
          Решение по заявке <Link>{recordId}</Link>
        </Text>
      }
      onOk={onConfirm}
      okText={CONFIRM_TEXT}
      onCancel={onCancel}
    >
      <Text>
        По заявке отсутствуют перемещения. Вы уверены, что хотите перейти к её выполнению?
      </Text>
    </BaseModal>
  )
}

export default ConfirmExecuteTaskModal
