import { PaperClipOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Upload } from 'antd'
import stubFalse from 'lodash/stubFalse'
import { Rule } from 'rc-field-form/es/interface'
import React, { FC } from 'react'

import Space from 'components/Space'

import { validationSizes } from 'shared/constants/validation'
import { getFilesFromEvent } from 'shared/utils/form'

import { CreateCommentFormFields, CreateCommentFormProps } from './interfaces'

const { TextArea } = Input

const commentValidationRules: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: validationSizes.string.long,
  },
]

const CreateCommentForm: FC<CreateCommentFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [form] = Form.useForm<CreateCommentFormFields>()

  const handleFinish = async (values: CreateCommentFormFields) => {
    await onSubmit(values, form)
  }

  return (
    <Space
      data-testid='create-comment-form'
      direction='vertical'
      size='middle'
      $block
    >
      <Form<CreateCommentFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
      >
        <Form.Item
          data-testid='comment-form-item'
          name='comment'
          rules={commentValidationRules}
        >
          <TextArea
            placeholder='Дополните информацию о заявке'
            disabled={isLoading}
          />
        </Form.Item>

        <Row align='middle' justify='space-between'>
          <Col>
            <Form.Item
              data-testid='attachments-form-item'
              name='attachments'
              valuePropName='fileList'
              getValueFromEvent={getFilesFromEvent}
            >
              <Upload beforeUpload={stubFalse} multiple disabled={isLoading}>
                <Button
                  type='link'
                  icon={<PaperClipOutlined />}
                  disabled={isLoading}
                >
                  Добавить вложение
                </Button>
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
