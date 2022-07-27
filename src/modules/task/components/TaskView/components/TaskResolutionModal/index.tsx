import {
  ButtonProps,
  Form,
  Input,
  Modal,
  ModalProps,
  Space,
  Typography,
} from 'antd'
import React, { FC, useMemo } from 'react'

import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import useTaskType from 'modules/task/hooks/useTaskType'
import { DEFAULT_MODAL_WIDTH } from 'shared/constants/components'
import { BUTTON_TEXT_CANCEL } from 'shared/constants/text'

import { TaskResolutionFormFields } from './interfaces'
import { TECH_RESOLUTION_RULES, USER_RESOLUTION_RULES } from './validation'

const { Text } = Typography
const { TextArea } = Input

const buttonCommonProps: ButtonProps = {
  size: 'large',
}

export type TaskResolutionModalProps = Pick<
  ModalProps,
  'visible' | 'title' | 'onCancel'
> &
  Pick<TaskDetailsModel, 'type' | 'techResolution' | 'userResolution'> & {
    isTaskResolving: boolean
    onResolutionSubmit: (values: TaskResolutionFormFields) => void
  }

const TaskResolutionModal: FC<TaskResolutionModalProps> = (props) => {
  const {
    isTaskResolving,
    onCancel,
    onResolutionSubmit,
    techResolution,
    title,
    type,
    userResolution,
    visible,
  } = props

  const [form] = Form.useForm<TaskResolutionFormFields>()

  const taskType = useTaskType(type)

  const initialFormValues: TaskResolutionFormFields = useMemo(
    () => ({ techResolution, userResolution }),
    [userResolution, techResolution],
  )

  const submitButtonProps = useMemo<ButtonProps>(
    () => ({
      ...buttonCommonProps,
      disabled: isTaskResolving,
      loading: isTaskResolving,
    }),
    [isTaskResolving],
  )

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={form.submit}
      onCancel={onCancel}
      okText='Выполнить заявку'
      okButtonProps={submitButtonProps}
      cancelText={BUTTON_TEXT_CANCEL}
      cancelButtonProps={buttonCommonProps}
      width={DEFAULT_MODAL_WIDTH}
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
          onFinish={onResolutionSubmit}
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
    </Modal>
  )
}

export default TaskResolutionModal
