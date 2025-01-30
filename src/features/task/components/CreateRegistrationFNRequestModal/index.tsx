import { Flex, Form, Select, Space, Typography, Upload } from 'antd'
import React, { FC, useEffect, useMemo } from 'react'

import { renderUploadedFile } from 'features/attachment/utils'

import UploadButton from 'components/Buttons/UploadButton'
import Label from 'components/Label'
import LoadingArea from 'components/LoadingArea'
import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

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
  values,

  changeTypes,
  changeTypesIsLoading,

  email,
  emailAsCopy,
  recipientsIsLoading,

  onCreateAttachment,
  createAttachmentIsLoading,

  ...modalProps
}) => {
  const { onSubmit, confirmLoading: isLoading } = modalProps

  const [form] = Form.useForm<CreateRegistrationFNRequestFormFields>()

  const onFinish = async (values: CreateRegistrationFNRequestFormFields) => {
    await onSubmit(values, form.setFields)
  }

  useEffect(() => {
    form.setFieldsValue(values)
  }, [form, values])

  const okButtonProps: BaseModalProps['okButtonProps'] = useMemo(
    () => ({ disabled: createAttachmentIsLoading }),
    [createAttachmentIsLoading],
  )

  return (
    <BaseModal
      {...modalProps}
      data-testid='create-registration-fn-request-modal'
      title='Отправка запроса на регистрацию ФН'
      onOk={form.submit}
      okText={SEND_TEXT}
      okButtonProps={okButtonProps}
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
              disabled={isLoading || changeTypesIsLoading}
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
              multiple
              disabled={isLoading}
              customRequest={onCreateAttachment}
              itemRender={renderUploadedFile()}
            >
              <UploadButton label='Добавить вложение' disabled={isLoading} />
            </Upload>
          </Form.Item>
        </Form>

        <Flex justify='space-between'>
          <Label data-testid='email' label='Получатели:'>
            <LoadingArea isLoading={recipientsIsLoading}>
              <Space direction='vertical'>{email.map((e) => e)}</Space>
            </LoadingArea>
          </Label>

          <Label data-testid='email-as-copy' label='Получатели копии:'>
            <LoadingArea isLoading={recipientsIsLoading}>
              <Space direction='vertical'>{emailAsCopy.map((e) => e)}</Space>
            </LoadingArea>
          </Label>
        </Flex>
      </Flex>
    </BaseModal>
  )
}

export default CreateRegistrationFNRequestModal
