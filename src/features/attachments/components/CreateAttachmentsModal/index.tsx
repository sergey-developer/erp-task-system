import { Form, FormInstance, ModalProps, Upload, UploadProps } from 'antd'
import { FormItemProps } from 'antd/es/form/FormItem'
import React, { FC } from 'react'

import UploadButton from 'components/Buttons/UploadButton'
import BaseModal from 'components/Modals/BaseModal'

import { filesFormItemProps } from 'shared/constants/form'
import { FileResponse } from 'shared/types/file'

const modalStyles: ModalProps['styles'] = { body: { paddingTop: 20 } }

export type CreateAttachmentsModalProps = Required<
  Pick<ModalProps, 'open' | 'title' | 'onCancel'>
> &
  Pick<UploadProps, 'defaultFileList'> & {
    form: FormInstance
    formItemName: FormItemProps['name']

    onCreate: NonNullable<UploadProps['customRequest']>

    onDelete: NonNullable<UploadProps<FileResponse>['onRemove']>
    isDeleting: boolean

    isLoading?: boolean
  }

const CreateAttachmentsModal: FC<CreateAttachmentsModalProps> = ({
  form,
  formItemName,

  isLoading,

  onCreate,

  onDelete,
  isDeleting,

  defaultFileList,
  ...props
}) => {
  return (
    <BaseModal
      {...props}
      data-testid='create-attachments-modal'
      width={450}
      footer={null}
      styles={modalStyles}
      isLoading={isLoading}
    >
      <Form form={form}>
        <Form.Item name={formItemName} {...filesFormItemProps}>
          <Upload
            listType='picture'
            multiple
            disabled={isDeleting}
            customRequest={onCreate}
            onRemove={onDelete}
            defaultFileList={defaultFileList}
            itemRender={(originNode, file) => (file.error ? null : originNode)}
          >
            <UploadButton label='Добавить фото' />
          </Upload>
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateAttachmentsModal
