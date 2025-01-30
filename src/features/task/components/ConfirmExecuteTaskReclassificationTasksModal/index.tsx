import { Typography } from 'antd'
import React, { FC } from 'react'

import { TaskModel } from 'features/task/models'

import ConfirmModal, { ConfirmModalProps } from 'components/Modals/ConfirmModal'

const { Text, Link } = Typography

export type ConfirmExecuteTaskReclassificationTasksModalProps = Required<
  Pick<ConfirmModalProps, 'open' | 'onOk' | 'onCancel'>
> &
  Pick<TaskModel, 'recordId'>

const ConfirmExecuteTaskReclassificationTasksModal: FC<
  ConfirmExecuteTaskReclassificationTasksModalProps
> = ({ recordId, ...props }) => {
  return (
    <ConfirmModal
      data-testid='confirm-execute-task-reclassification-tasks-modal'
      title={
        <Text>
          Решение по заявке <Link>{recordId}</Link>
        </Text>
      }
      {...props}
    >
      <Text>
        По заявке отсутствуют перемещения. Вы уверены, что хотите перейти к её выполнению?
      </Text>
    </ConfirmModal>
  )
}

export default ConfirmExecuteTaskReclassificationTasksModal
