import { useMount } from 'ahooks'
import { Button, Col, Flex, Form, Input, InputNumber, Row, Select, Typography, Upload } from 'antd'
import stubFalse from 'lodash/stubFalse'
import React, { FC } from 'react'

import { useTaskType } from 'features/tasks/hooks'

import UploadButton from 'components/Buttons/UploadButton'
import Label from 'components/Label'
import BaseModal from 'components/Modals/BaseModal'
import Space from 'components/Space'

import { filesFormItemProps } from 'shared/constants/form'
import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'

import { ExecuteTaskFormFields, ExecuteTaskModalProps } from './types'
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
  supportGroup,

  resolutionClassifications,
  resolutionClassificationsIsLoading,
}) => {
  const [form] = Form.useForm<ExecuteTaskFormFields>()
  const techResolutionFormValue = Form.useWatch('techResolution', form)

  useMount(() => {
    form.setFieldsValue({ spentHours: 1, spentMinutes: 0 })
  })

  const taskType = useTaskType(type)

  const modalTitle = (
    <Text>
      Решение по заявке <Link>{recordId}</Link>
    </Text>
  )

  const onFinish = async (values: ExecuteTaskFormFields) => {
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

        <Form<ExecuteTaskFormFields> form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item label='Затраченное время'>
            <Flex gap='middle'>
              <Label block={false} label='Часов' labelPosition='right' direction='horizontal'>
                <Form.Item data-testid='spent-hours' rules={spentHoursRules} name='spentHours'>
                  <InputNumber style={{ width: 60 }} min={0} disabled={isLoading} />
                </Form.Item>
              </Label>

              <Label block={false} label='Минут' labelPosition='right' direction='horizontal'>
                <Form.Item
                  data-testid='spent-minutes'
                  rules={spentMinutesRules}
                  name='spentMinutes'
                >
                  <InputNumber style={{ width: 60 }} min={0} max={59} disabled={isLoading} />
                </Form.Item>
              </Label>
            </Flex>
          </Form.Item>

          {supportGroup?.hasResolutionClassifiers && (
            <Form.Item
              data-testid='resolution-classification-form-item'
              name='resolutionClassifier1'
              label='Категория решения'
              rules={onlyRequiredRules}
            >
              <Select
                fieldNames={idAndTitleSelectFieldNames}
                options={resolutionClassifications}
                loading={resolutionClassificationsIsLoading}
                disabled={isLoading || resolutionClassificationsIsLoading}
                placeholder='Выберите категорию решения'
              />
            </Form.Item>
          )}

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
