import { Form, Select, Upload } from 'antd'
import React, { FC, useMemo } from 'react'

import { renderUploadedFile } from 'modules/attachment/utils'

import UploadButton from 'components/Buttons/UploadButton'
import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { CREATE_TEXT } from 'shared/constants/common'
import { filesFormItemProps } from 'shared/constants/form'
import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { UrgencyRateTypeListItemModel } from 'shared/models/catalogs/urgencyRateTypes'

import { CreateInfrastructureOrderFormFields, CreateInfrastructureOrderModalProps } from './types'

const CreateInfrastructureOrderFormModal: FC<CreateInfrastructureOrderModalProps> = ({
  isLoading,
  onSubmit,

  urgencyRateTypes,
  urgencyRateTypesIsLoading,

  onUploadFile,
  fileIsUploading,
  onDeleteFile,
  fileIsDeleting,

  ...props
}) => {
  const [form] = Form.useForm<CreateInfrastructureOrderFormFields>()

  const onFinish = async (values: CreateInfrastructureOrderFormFields) => {
    await onSubmit(values, form)
  }

  const okButtonProps: BaseModalProps['okButtonProps'] = useMemo(
    () => ({ disabled: fileIsUploading || fileIsDeleting }),
    [fileIsDeleting, fileIsUploading],
  )

  return (
    <BaseModal
      {...props}
      okButtonProps={okButtonProps}
      confirmLoading={isLoading}
      okText={CREATE_TEXT}
      onOk={form.submit}
      data-testid='create-infrastructure-order-modal'
      title='Создать бланк-заказ'
    >
      <Form<CreateInfrastructureOrderFormFields> layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item
          data-testid='urgency-rate-type-form-item'
          name='urgencyRateType'
          label='Тариф'
          rules={onlyRequiredRules}
        >
          <Select<UrgencyRateTypeListItemModel['id'], UrgencyRateTypeListItemModel>
            fieldNames={idAndTitleSelectFieldNames}
            disabled={urgencyRateTypesIsLoading || isLoading}
            loading={urgencyRateTypesIsLoading}
            options={urgencyRateTypes}
            placeholder='Выберите из списка'
          />
        </Form.Item>

        <Form.Item data-testid='attachments-form-item' name='attachments' {...filesFormItemProps}>
          <Upload
            multiple
            listType='picture'
            customRequest={onUploadFile}
            onRemove={onDeleteFile}
            itemRender={renderUploadedFile({ canDelete: !fileIsDeleting })}
            disabled={isLoading || fileIsDeleting}
          >
            <UploadButton label='Добавить файлы' disabled={isLoading} />
          </Upload>
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateInfrastructureOrderFormModal
