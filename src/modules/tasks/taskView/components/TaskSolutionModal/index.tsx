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

import useTaskType from 'modules/tasks/hooks/useTaskType'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'

import { TaskSolutionFormFields } from './interfaces'

const { Text } = Typography
const { TextArea } = Input

const buttonCommonProps: ButtonProps = {
  size: 'large',
}

export type TaskSolutionModalProps = Pick<
  ModalProps,
  'visible' | 'title' | 'onOk' | 'onCancel'
> &
  Pick<TaskDetailsModel, 'type' | 'techResolution' | 'userResolution'> & {
    isTaskResolving: boolean
    onResolutionSubmit: (values: TaskSolutionFormFields) => void
  }

const TaskSolutionModal: FC<TaskSolutionModalProps> = (props) => {
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

  const [form] = Form.useForm<TaskSolutionFormFields>()

  const taskType = useTaskType(type)

  const initialFormValues: TaskSolutionFormFields = useMemo(
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
      cancelText='Отменить'
      cancelButtonProps={buttonCommonProps}
      width={613}
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

        <Form<TaskSolutionFormFields>
          form={form}
          initialValues={initialFormValues}
          layout='vertical'
          onFinish={onResolutionSubmit}
        >
          <Form.Item
            label='Техническое решение'
            name='techResolution'
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
                whitespace: true,
              },
            ]}
          >
            <TextArea placeholder='Расскажите о работах на объекте' />
          </Form.Item>

          {!taskType.isIncidentTask && !taskType.isRequestTask && (
            <Form.Item
              label='Решение для пользователя'
              name='userResolution'
              rules={[
                {
                  required: true,
                  message: 'Обязательное поле',
                  whitespace: true,
                },
              ]}
            >
              <TextArea placeholder='Расскажите заявителю о решении' />
            </Form.Item>
          )}
        </Form>
      </Space>
    </Modal>
  )
}

export default TaskSolutionModal
