import { Form, ModalProps, Typography } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

const { Text, Link } = Typography

export type CreateSubTaskModalProps = Pick<TaskDetailsModel, 'recordId'> & {
  isLoading: boolean
  onCancel: NonNullable<ModalProps['onCancel']>
}

const CreateSubTaskModal: FC<CreateSubTaskModalProps> = ({
  recordId,
  isLoading,
  onCancel,
}) => {
  const [form] = Form.useForm()

  const modalTitle = (
    <Text>
      Задание по заявке <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = () => {}

  return (
    <BaseModal
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText='Создать задание'
      onCancel={onCancel}
    ></BaseModal>
  )
}

export default CreateSubTaskModal
