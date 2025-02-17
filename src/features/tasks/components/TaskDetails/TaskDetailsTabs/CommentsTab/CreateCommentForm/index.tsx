import { Button, Col, Form, Input, Row, Upload } from 'antd'
import stubFalse from 'lodash/stubFalse'
import { Rule } from 'rc-field-form/es/interface'
import React, { FC } from 'react'

import UploadButton from 'components/Buttons/UploadButton'
import Space from 'components/Space'

import { filesFormItemProps } from 'shared/constants/form'

import { CreateCommentFormFields, CreateCommentFormProps } from './types'

const { TextArea } = Input

const commentRules: Rule[] = [{ required: true, whitespace: true, max: 10000 }]

const CreateCommentForm: FC<CreateCommentFormProps> = ({ onSubmit, isLoading }) => {
  const [form] = Form.useForm<CreateCommentFormFields>()

  const onFinish = async (values: CreateCommentFormFields) => {
    await onSubmit(values, form)
  }

  return (
    <Space data-testid='create-taskComment-form' direction='vertical' size='middle' $block>
      <Form<CreateCommentFormFields> form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item data-testid='taskComment-form-item' name='comment' rules={commentRules}>
          <TextArea placeholder='Дополните информацию о заявке' disabled={isLoading} />
        </Form.Item>

        <Row align='middle' justify='space-between'>
          <Col>
            <Form.Item
              data-testid='attachments-form-item'
              name='attachments'
              {...filesFormItemProps}
            >
              <Upload beforeUpload={stubFalse} multiple disabled={isLoading}>
                <UploadButton label='Добавить вложение' disabled={isLoading} />
              </Upload>
            </Form.Item>
          </Col>

          <Col>
            <Button type='primary' htmlType='submit' loading={isLoading}>
              Опубликовать комментарий
            </Button>
          </Col>
        </Row>
      </Form>
    </Space>
  )
}

export default CreateCommentForm
