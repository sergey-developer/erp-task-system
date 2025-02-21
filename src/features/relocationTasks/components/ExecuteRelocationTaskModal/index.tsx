import { PaperClipOutlined } from '@ant-design/icons'
import { Button, Form, Upload } from 'antd'
import stubFalse from 'lodash/stubFalse'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import Space from 'components/Space'

import { onlyRequiredRules } from 'shared/constants/validation'
import { getFilesFromEvent } from 'shared/utils/form'

import { ExecuteRelocationTaskFormFields, ExecuteRelocationTaskModalProps } from './types'

const ExecuteRelocationTaskModal: FC<ExecuteRelocationTaskModalProps> = ({
  isLoading,
  onSubmit,
  ...props
}) => {
  const [form] = Form.useForm<ExecuteRelocationTaskFormFields>()

  const handleFinish = async (values: ExecuteRelocationTaskFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      data-testid='execute-relocation-task-modal'
      {...props}
      title='Решение по заявке'
      confirmLoading={isLoading}
      onOk={form.submit}
      okText='Выполнить заявку'
    >
      <Space $block direction='vertical' size='large'>
        <Form<ExecuteRelocationTaskFormFields>
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
            <Upload beforeUpload={stubFalse} multiple>
              <Button type='link' icon={<PaperClipOutlined />}>
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
