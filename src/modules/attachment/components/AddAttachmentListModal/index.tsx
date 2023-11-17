import { Form, FormInstance, Modal, ModalProps, Upload, UploadProps } from 'antd'
import { FormItemProps } from 'antd/es/form/FormItem'
import React, { FC } from 'react'

import UploadButton from 'components/Buttons/UploadButton'

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

    onDelete: NonNullable<UploadProps<FileResponse>['onRemove']>
    isDeleting: boolean
  }

// todo: добавить индикатор загрузки при удалении
const AddAttachmentListModal: FC<AddAttachmentListModalProps> = ({
  form,
  formItemName,

  onAdd,

  onDelete,
  isDeleting,

  defaultFileList,
  ...props
}) => {
  return (
    <Modal
      {...props}
      data-testid='add-attachment-list-modal'
      width={450}
      footer={null}
      bodyStyle={bodyStyle}
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
            <UploadButton label='Добавить фото' />
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddAttachmentListModal
