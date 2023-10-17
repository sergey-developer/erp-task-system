import { PaperClipOutlined } from '@ant-design/icons'
import { Button, Form, Upload } from 'antd'
import stubFalse from 'lodash/stubFalse'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import Space from 'components/Space'

import { onlyRequiredRules } from 'shared/constants/validation'
import { getFilesFromEvent } from 'shared/utils/form'

import { ExecuteRelocationTaskModalFormFields, ExecuteRelocationTaskModalProps } from './types'

const ExecuteRelocationTaskModal: FC<ExecuteRelocationTaskModalProps> = ({
  isLoading,

  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm<ExecuteRelocationTaskModalFormFields>()

  const handleFinish = async (values: ExecuteRelocationTaskModalFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      data-testid='execute-relocation-task-modal'
      title='Решение по заявке'
      confirmLoading={isLoading}
      onOk={form.submit}
      okText='Выполнить заявку'
      onCancel={onCancel}
    >
      <Space $block direction='vertical' size='large'>
        <Form<ExecuteRelocationTaskModalFormFields>
          form={form}
          layout='vertical'
          onFinish={handleFinish}
          preserve={false}
        >
          <Form.Item
            data-testid='documents-form-item'
            name='documents'
            label='Документы, подтверждающие перемещение:'
            rules={onlyRequiredRules}
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

export default ExecuteRelocationTaskModal
