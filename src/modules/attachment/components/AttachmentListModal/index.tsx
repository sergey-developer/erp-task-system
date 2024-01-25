import { FC } from 'react'

import { AttachmentListModel } from 'modules/attachment/models'
import { RelocationTaskAttachmentsModel } from 'modules/warehouse/models'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import AttachmentList from '../AttachmentList'

export type AttachmentListModalProps = Required<
  Pick<BaseModalProps, 'open' | 'title' | 'onCancel'>
> &
  Pick<BaseModalProps, 'isLoading'> & {
    data: AttachmentListModel | RelocationTaskAttachmentsModel
  }

const AttachmentListModal: FC<AttachmentListModalProps> = ({ data, ...props }) => {
  return (
    <BaseModal {...props} data-testid='attachment-list-modal' width={370} footer={null}>
      <AttachmentList data={data} />
    </BaseModal>
  )
}

export default AttachmentListModal
