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

import { AddTaskSolutionFormFields } from './interfaces'

const { Text } = Typography
const { TextArea } = Input

const buttonCommonProps: ButtonProps = {
  size: 'large',
}

type TaskDecisionModalProps = Pick<
  ModalProps,
  'visible' | 'title' | 'onOk' | 'onCancel'
> &
  Pick<TaskDetailsModel, 'type' | 'techResolution' | 'userResolution'>

const AddTaskSolutionModal: FC<TaskDecisionModalProps> = (props) => {
  const {
    title,
    visible,
    onOk,
    onCancel,
    type,
    userResolution,
    techResolution,
  } = props

  const taskType = useTaskType(type)

  const initialFormValues: AddTaskSolutionFormFields = useMemo(
    () => ({
      technicalSolution: techResolution,
      solutionForUser: userResolution,
    }),
    [userResolution, techResolution],
  )

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText='Выполнить заявку'
      okButtonProps={buttonCommonProps}
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

        <Form<AddTaskSolutionFormFields>
          layout='vertical'
          initialValues={initialFormValues}
        >
          <Form.Item label='Техническое решение' name='technicalSolution'>
            <TextArea placeholder='Расскажите о работах на объекте' />
          </Form.Item>

          {!taskType.isIncidentTask && !taskType.isRequestTask && (
            <Form.Item label='Решение для пользователя' name='solutionForUser'>
              <TextArea placeholder='Расскажите заявителю о решении' />
            </Form.Item>
          )}
        </Form>
      </Space>
    </Modal>
  )
}

export default AddTaskSolutionModal
