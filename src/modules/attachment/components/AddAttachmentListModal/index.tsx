import { Form, FormInstance, ModalProps, Upload, UploadProps } from 'antd'
import { FormItemProps } from 'antd/es/form/FormItem'
import React, { FC } from 'react'

import UploadButton from 'components/Buttons/UploadButton'
import BaseModal from 'components/Modals/BaseModal'

import { filesFormItemProps } from 'shared/constants/form'
import { FileResponse } from 'shared/types/file'

const bodyStyle: ModalProps['bodyStyle'] = { paddingTop: 20 }

export type AddAttachmentListModalProps = Required<
  Pick<ModalProps, 'open' | 'title' | 'onCancel'>
> &
  Pick<UploadProps, 'defaultFileList'> & {
    form: FormInstance
    formItemName: FormItemProps['name']

    onAdd: NonNullable<UploadProps['customRequest']>
    isAdding: boolean

    onDelete: NonNullable<UploadProps<FileResponse>['onRemove']>
    isDeleting: boolean

    isLoading?: boolean
  }

// todo: добавить индикатор загрузки при удалении
const AddAttachmentListModal: FC<AddAttachmentListModalProps> = ({
  form,
  formItemName,

  isLoading,

  onAdd,
  isAdding,

  onDelete,
  isDeleting,

  defaultFileList,
  ...props
}) => {
  return (
    <BaseModal
      {...props}
      data-testid='add-attachment-list-modal'
      width={450}
      footer={null}
      bodyStyle={bodyStyle}
      isLoading={isLoading}
    >
      <Form form={form}>
        <Form.Item name={formItemName} {...filesFormItemProps}>
          <Upload
            listType='picture'
            multiple
            disabled={isDeleting}
            customRequest={onAdd}
            onRemove={onDelete}
            defaultFileList={defaultFileList}
          >
            <UploadButton label='Добавить фото' loading={isAdding} />
          </Upload>
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default AddAttachmentListModal
