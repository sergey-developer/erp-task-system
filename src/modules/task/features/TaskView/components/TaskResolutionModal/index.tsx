import { Form, FormInstance, Input, ModalProps, Space, Typography } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import useTaskType from 'modules/task/hooks/useTaskType'
import { BASE_LONG_TEXT_RULES } from 'shared/constants/validation'

import { TaskResolutionFormFields } from './interfaces'

const { Text, Link } = Typography
const { TextArea } = Input

export type TaskResolutionModalProps = Pick<ModalProps, 'onCancel'> &
  Pick<
    TaskDetailsModel,
    'type' | 'techResolution' | 'userResolution' | 'recordId'
  > & {
    isLoading: boolean
    onSubmit: (
      values: TaskResolutionFormFields,
      setFields: FormInstance['setFields'],
    ) => void
  }

const TaskResolutionModal: FC<TaskResolutionModalProps> = ({
  isLoading,
  onCancel,
  onSubmit,
  techResolution,
  recordId,
  type,
  userResolution,
}) => {
  const [form] = Form.useForm<TaskResolutionFormFields>()

  const taskType = useTaskType(type)

  const initialFormValues: Partial<TaskResolutionFormFields> = {
    techResolution,
    userResolution,
  }

  const modalTitle = (
    <Text>
      Решение по заявке <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = async ({
    techResolution,
    userResolution,
  }: TaskResolutionFormFields) => {
    await onSubmit(
      { techResolution, userResolution: userResolution || undefined },
      form.setFields,
    )
  }

  return (
    <BaseModal
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText='Выполнить заявку'
      onCancel={onCancel}
    >
      <Space direction='vertical' size='large'>
        <Space direction='vertical'>
          <Text>
            Заполните информацию о работах на объекте и предложенном решении.
            Затем нажмите кнопку «Выполнить заявку».
          </Text>

          <Text type='danger'>
            После выполнения заявка будет доступна только в режиме просмотра.
          </Text>
        </Space>

        <Form<TaskResolutionFormFields>
          form={form}
          initialValues={initialFormValues}
          layout='vertical'
          onFinish={handleFinish}
          preserve={false}
        >
          <Form.Item
            label='Техническое решение'
            name='techResolution'
            rules={BASE_LONG_TEXT_RULES}
          >
            <TextArea
              placeholder='Расскажите о работах на объекте'
              disabled={isLoading}
            />
          </Form.Item>

          {!taskType.isIncidentTask && !taskType.isRequestTask && (
            <Form.Item
              label='Решение для пользователя'
              name='userResolution'
              rules={BASE_LONG_TEXT_RULES}
            >
              <TextArea
                placeholder='Расскажите заявителю о решении'
                disabled={isLoading}
              />
            </Form.Item>
          )}
        </Form>
      </Space>
    </BaseModal>
  )
}

export default TaskResolutionModal
