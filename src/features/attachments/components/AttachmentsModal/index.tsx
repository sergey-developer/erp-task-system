import { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import { SetNonNullable } from 'shared/types/utils'

import AttachmentImages from '../AttachmentImages'
import { AttachmentImagesProps } from '../AttachmentImages/types'

export type AttachmentsModalProps = SetNonNullable<BaseModalProps, 'open' | 'title' | 'onCancel'> &
  Pick<BaseModalProps, 'isLoading'> &
  Pick<AttachmentImagesProps, 'data'>

const AttachmentsModal: FC<AttachmentsModalProps> = ({ data, ...props }) => {
  return (
    <BaseModal {...props} data-testid='attachments-modal' width={370} footer={null}>
      <AttachmentImages data={data} />
    </BaseModal>
  )
}

export default AttachmentsModal
