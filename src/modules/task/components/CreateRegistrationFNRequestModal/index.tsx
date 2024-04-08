import { Flex, Form, Select, Space, Typography, Upload } from 'antd'
import stubFalse from 'lodash/stubFalse'
import React, { FC } from 'react'

import { renderUploadedFile } from 'modules/attachment/utils'

import UploadButton from 'components/Buttons/UploadButton'
import Label from 'components/Label'
import BaseModal from 'components/Modals/BaseModal'

import { SEND_TEXT } from 'shared/constants/common'
import { filesFormItemProps } from 'shared/constants/form'
import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'

import {
  CreateRegistrationFNRequestFormFields,
  CreateRegistrationFNRequestModalProps,
} from './types'

const { Text } = Typography

const CreateRegistrationFNRequestModal: FC<CreateRegistrationFNRequestModalProps> = ({
  changeTypes,
  changeTypesIsLoading,

  email,
  emailAsCopy,

  onCreateAttachment,

  ...modalProps
}) => {
  const { onSubmit, confirmLoading: isLoading } = modalProps

  const [form] = Form.useForm<CreateRegistrationFNRequestFormFields>()

  const onFinish = async (values: CreateRegistrationFNRequestFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      {...modalProps}
      data-testid='create-registration-fn-request-modal'
      title='Отправка запроса на регистрацию ФН'
      onOk={form.submit}
      okText={SEND_TEXT}
    >
      <Flex vertical gap='large'>
        <Text>
          Для регистрации фискального накопителя система автоматически направит письмо с
          прикрепленными файлами. Результат обработки запроса будет отображен в журнале заявки.
        </Text>

        <Form<CreateRegistrationFNRequestFormFields>
          layout='vertical'
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            data-testid='change-type-form-item'
            name='changeType'
            label='Тип замены ФН'
            rules={onlyRequiredRules}
          >
            <Select
              fieldNames={idAndTitleSelectFieldNames}
              loading={changeTypesIsLoading}
              options={changeTypes}
              placeholder='Выберите из списка'
            />
          </Form.Item>

          <Form.Item
            data-testid='attachments-form-item'
            name='attachments'
            label='Документы о фискализации:'
            rules={onlyRequiredRules}
            {...filesFormItemProps}
          >
            <Upload
              beforeUpload={stubFalse}
              multiple
              disabled={isLoading}
              customRequest={onCreateAttachment}
              itemRender={renderUploadedFile}
            >
              <UploadButton label='Добавить вложение' disabled={isLoading} />
            </Upload>
          </Form.Item>
        </Form>

        <Flex justify='space-between'>
          <Label data-testid='email' label='Получатели:'>
            <Space direction='vertical'>{email.map((e) => e)}</Space>
          </Label>

          <Label data-testid='email-as-copy' label='Получатели копии:'>
            <Space direction='vertical'>{emailAsCopy.map((e) => e)}</Space>
          </Label>
        </Flex>
      </Flex>
    </BaseModal>
  )
}

export default CreateRegistrationFNRequestModal
