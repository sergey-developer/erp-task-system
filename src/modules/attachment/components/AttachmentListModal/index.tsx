import { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import AttachmentImages from '../AttachmentImages'
import { AttachmentImagesProps } from '../AttachmentImages/types'

export type AttachmentListModalProps = Required<
  Pick<BaseModalProps, 'open' | 'title' | 'onCancel'>
> &
  Pick<BaseModalProps, 'isLoading'> &
  Pick<AttachmentImagesProps, 'data'>

// todo: переименовать
const AttachmentListModal: FC<AttachmentListModalProps> = ({ data, ...props }) => {
  return (
    <BaseModal {...props} data-testid='attachment-list-modal' width={370} footer={null}>
      <AttachmentImages data={data} />
    </BaseModal>
  )
}

export default AttachmentListModal
