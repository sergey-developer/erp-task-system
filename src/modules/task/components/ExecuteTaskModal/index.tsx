import { Button, Col, Flex, Form, Input, InputNumber, Row, Typography, Upload } from 'antd'
import stubFalse from 'lodash/stubFalse'
import React, { FC } from 'react'

import { useTaskType } from 'modules/task/hooks/task'

import UploadButton from 'components/Buttons/UploadButton'
import LabeledData from 'components/LabeledData'
import BaseModal from 'components/Modals/BaseModal'
import Space from 'components/Space'

import { filesFormItemProps } from 'shared/constants/form'

import { ExecuteTaskModalFormFields, ExecuteTaskModalProps } from './types'
import {
  spentHoursRules,
  spentMinutesRules,
  techResolutionRules,
  userResolutionRules,
} from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

const okBtnText = 'Выполнить заявку'

const ExecuteTaskModal: FC<ExecuteTaskModalProps> = ({
  onGetAct,
  getActIsLoading,

  open,
  isLoading,
  onSubmit,

  onCancel,
  recordId,
  type,
}) => {
  const [form] = Form.useForm<ExecuteTaskModalFormFields>()
  const techResolutionFormValue = Form.useWatch('techResolution', form)

  const taskType = useTaskType(type)

  const modalTitle = (
    <Text>
      Решение по заявке <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = async (values: ExecuteTaskModalFormFields) => {
    await onSubmit(values, form.setFields)
  }

  const onClickGetAct = async () => {
    if (techResolutionFormValue) {
      await onGetAct({ techResolution: techResolutionFormValue })
    }
  }

  return (
    <BaseModal
      data-testid='execute-task-modal'
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

        <Form<ExecuteTaskModalFormFields>
          form={form}
          layout='vertical'
          onFinish={handleFinish}
          preserve={false}
        >
          <Form.Item label='Затраченное время'>
            <Flex gap='middle'>
              <LabeledData block={false} label='Часов' labelPosition='right' direction='horizontal'>
                <Form.Item data-testid='spent-hours' rules={spentHoursRules} name='spentHours'>
                  <InputNumber style={{ width: 60 }} defaultValue={1} min={0} />
                </Form.Item>
              </LabeledData>

              <LabeledData block={false} label='Минут' labelPosition='right' direction='horizontal'>
                <Form.Item
                  data-testid='spent-minutes'
                  rules={spentMinutesRules}
                  name='spentMinutes'
                >
                  <InputNumber style={{ width: 60 }} min={0} max={59} />
                </Form.Item>
              </LabeledData>
            </Flex>
          </Form.Item>

          <Form.Item
            data-testid='tech-resolution'
            label='Техническое решение'
            name='techResolution'
            rules={techResolutionRules}
          >
            <TextArea placeholder='Расскажите о работах на объекте' disabled={isLoading} />
          </Form.Item>

          {!taskType.isIncidentTask && !taskType.isRequestTask && (
            <Form.Item
              data-testid='user-resolution'
              label='Решение для пользователя'
              name='userResolution'
              rules={userResolutionRules}
            >
              <TextArea placeholder='Расскажите заявителю о решении' disabled={isLoading} />
            </Form.Item>
          )}

          <Form.Item data-testid='attachments-form-item' name='attachments' {...filesFormItemProps}>
            <Upload beforeUpload={stubFalse} multiple disabled={isLoading}>
              <UploadButton label='Добавить вложение' disabled={isLoading} />
            </Upload>
          </Form.Item>
        </Form>
      </Space>
    </BaseModal>
  )
}

export default ExecuteTaskModal
