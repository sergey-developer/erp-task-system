import {
  ButtonProps,
  Form,
  FormInstance,
  Input,
  ModalProps,
  Space,
  Typography,
} from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import useTaskType from 'modules/task/hooks/useTaskType'

import { TaskResolutionFormFields } from './interfaces'
import { TECH_RESOLUTION_RULES, USER_RESOLUTION_RULES } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

const buttonCommonProps: ButtonProps = {
  size: 'large',
}

export type TaskResolutionModalProps = Pick<
  ModalProps,
  'visible' | 'onCancel'
> &
  Pick<
    TaskDetailsModel,
    'type' | 'techResolution' | 'userResolution' | 'recordId'
  > & {
    isTaskResolving: boolean
    onSubmit: (
      values: TaskResolutionFormFields,
      setFields: FormInstance['setFields'],
    ) => void
  }

const TaskResolutionModal: FC<TaskResolutionModalProps> = ({
  isTaskResolving,
  onCancel,
  onSubmit,
  techResolution,
  recordId,
  type,
  userResolution,
  visible,
}) => {
  const [form] = Form.useForm<TaskResolutionFormFields>()

  const taskType = useTaskType(type)

  const initialFormValues: Partial<TaskResolutionFormFields> = {
    techResolution,
    userResolution,
  }

  const submitButtonProps: ButtonProps = {
    ...buttonCommonProps,
    disabled: isTaskResolving,
    loading: isTaskResolving,
    htmlType: 'submit',
  }

  const modalTitle = (
    <Text>
      Решение по заявке <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = async (values: TaskResolutionFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      title={modalTitle}
      visible={visible}
      onOk={form.submit}
      okText='Выполнить заявку'
      okButtonProps={submitButtonProps}
      onCancel={onCancel}
      cancelButtonProps={buttonCommonProps}
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
          requiredMark={false}
        >
          <Form.Item
            label='Техническое решение'
            name='techResolution'
            rules={TECH_RESOLUTION_RULES}
          >
            <TextArea placeholder='Расскажите о работах на объекте' />
          </Form.Item>

          {!taskType.isIncidentTask && !taskType.isRequestTask && (
            <Form.Item
              label='Решение для пользователя'
              name='userResolution'
              rules={USER_RESOLUTION_RULES}
            >
              <TextArea placeholder='Расскажите заявителю о решении' />
            </Form.Item>
          )}
        </Form>
      </Space>
    </BaseModal>
  )
}

export default TaskResolutionModal
