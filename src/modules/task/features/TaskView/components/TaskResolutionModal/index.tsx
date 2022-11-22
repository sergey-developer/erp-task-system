import { Form, FormInstance, Input, ModalProps, Space, Typography } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import useTaskType from 'modules/task/hooks/useTaskType'
import { BASE_LONG_TEXT_RULES } from 'shared/constants/validation'
import { isEqual } from 'shared/utils/common/isEqual'

import { TaskResolutionFormFields } from './interfaces'

const { Text, Link } = Typography
const { TextArea } = Input
const OK_BUTTON_TEXT = 'Выполнить заявку'

export type TaskResolutionModalProps = Pick<
  TaskDetailsModel,
  'type' | 'recordId'
> & {
  initialFormValues: Partial<TaskResolutionFormFields>
  isLoading: boolean
  onSubmit: (
    values: TaskResolutionFormFields,
    setFields: FormInstance['setFields'],
  ) => void
  onCancel: NonNullable<ModalProps['onCancel']>
}

const TaskResolutionModal: FC<TaskResolutionModalProps> = ({
  isLoading,
  onCancel,
  onSubmit,
  recordId,
  type,
  initialFormValues,
}) => {
  const [form] = Form.useForm<TaskResolutionFormFields>()

  const taskType = useTaskType(type)

  const modalTitle = (
    <Text>
      Решение по заявке <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = async (values: TaskResolutionFormFields) => {
    const handledValues: TaskResolutionFormFields = {
      techResolution: values.techResolution?.trim(),
      userResolution: values.userResolution?.trim(),
    }

    const techResolutionNotChanged = isEqual(
      initialFormValues.techResolution,
      handledValues.techResolution,
    )
    const userResolutionNotChanged = isEqual(
      initialFormValues.userResolution,
      handledValues.userResolution,
    )

    if (techResolutionNotChanged && userResolutionNotChanged) return

    await onSubmit(
      {
        techResolution: techResolutionNotChanged
          ? undefined
          : handledValues.techResolution,
        userResolution: userResolutionNotChanged
          ? undefined
          : handledValues.userResolution,
      },
      form.setFields,
    )
  }

  return (
    <BaseModal
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText={OK_BUTTON_TEXT}
      onCancel={onCancel}
    >
      <Space direction='vertical' size='large'>
        <Space direction='vertical'>
          <Text>
            Заполните информацию о работах на объекте и предложенном решении.
            Затем нажмите кнопку «{OK_BUTTON_TEXT}».
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
            data-testid='tech-resolution'
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
              data-testid='user-resolution'
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
