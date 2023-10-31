import { PaperClipOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Typography, Upload } from 'antd'
import stubFalse from 'lodash/stubFalse'
import { Rule } from 'rc-field-form/es/interface'
import React, { FC } from 'react'

import { useTaskType } from 'modules/task/hooks/task'

import BaseModal from 'components/Modals/BaseModal'
import Space from 'components/Space'

import { validationSizes } from 'shared/constants/validation'
import { getFilesFromEvent } from 'shared/utils/form'

import { TaskResolutionFormFields, TaskResolutionModalProps } from './types'

const { Text, Link } = Typography
const { TextArea } = Input

const okBtnText = 'Выполнить заявку'

const techResolutionValidationRules: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: validationSizes.string.long,
  },
]

const userResolutionValidationRules: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: validationSizes.string.long,
  },
]

const TaskResolutionModal: FC<TaskResolutionModalProps> = ({
  onGetAct,
  getActIsLoading,

  open,
  isLoading,
  onSubmit,

  onCancel,
  recordId,
  type,
}) => {
  const [form] = Form.useForm<TaskResolutionFormFields>()
  const techResolutionFormValue = Form.useWatch('techResolution', form)

  const taskType = useTaskType(type)

  const modalTitle = (
    <Text>
      Решение по заявке <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = async (values: TaskResolutionFormFields) => {
    await onSubmit(values, form.setFields)
  }

  const onClickGetAct = async () => {
    if (techResolutionFormValue) {
      await onGetAct({ techResolution: techResolutionFormValue })
    }
  }

  return (
    <BaseModal
      data-testid='task-resolution-modal'
      open={open}
      title={modalTitle}
      onCancel={onCancel}
      footer={
        <Row justify='space-between'>
          <Col>
            <Button
              onClick={onClickGetAct}
              loading={getActIsLoading}
              disabled={!techResolutionFormValue}
            >
              Сформировать акт
            </Button>
          </Col>

          <Col>
            <Space>
              <Button onClick={onCancel}>Отменить</Button>

              <Button type='primary' onClick={form.submit} loading={isLoading}>
                {okBtnText}
              </Button>
            </Space>
          </Col>
        </Row>
      }
    >
      <Space $block direction='vertical' size='large'>
        <Space direction='vertical'>
          <Text>
            Заполните информацию о работах на объекте и предложенном решении. Затем нажмите кнопку «
            {okBtnText}».
          </Text>

          <Text type='danger'>
            После выполнения заявка будет доступна только в режиме просмотра.
          </Text>
        </Space>

        <Form<TaskResolutionFormFields>
          form={form}
          layout='vertical'
          onFinish={handleFinish}
          preserve={false}
        >
          <Form.Item
            data-testid='tech-resolution'
            label='Техническое решение'
            name='techResolution'
            rules={techResolutionValidationRules}
          >
            <TextArea placeholder='Расскажите о работах на объекте' disabled={isLoading} />
          </Form.Item>

          {!taskType.isIncidentTask && !taskType.isRequestTask && (
            <Form.Item
              data-testid='user-resolution'
              label='Решение для пользователя'
              name='userResolution'
              rules={userResolutionValidationRules}
            >
              <TextArea placeholder='Расскажите заявителю о решении' disabled={isLoading} />
            </Form.Item>
          )}

          <Form.Item
            data-testid='attachments-form-item'
            name='attachments'
            valuePropName='fileList'
            getValueFromEvent={getFilesFromEvent}
          >
            <Upload beforeUpload={stubFalse} multiple disabled={isLoading}>
              <Button type='link' icon={<PaperClipOutlined />} disabled={isLoading}>
                Добавить вложение
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Space>
    </BaseModal>
  )
}

export default TaskResolutionModal
