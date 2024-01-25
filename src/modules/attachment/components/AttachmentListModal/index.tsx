import { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

import AttachmentList from '../AttachmentList'
import { AttachmentListProps } from '../AttachmentList/types'

export type AttachmentListModalProps = Required<
  Pick<BaseModalProps, 'open' | 'title' | 'onCancel'>
> &
  Pick<BaseModalProps, 'isLoading'> &
  Pick<AttachmentListProps, 'data'>

const AttachmentListModal: FC<AttachmentListModalProps> = ({ data, ...props }) => {
  return (
    <BaseModal {...props} data-testid='attachment-list-modal' width={370} footer={null}>
      <AttachmentList data={data} />
    </BaseModal>
  )
}

export default AttachmentListModal
