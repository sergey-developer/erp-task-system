import { Modal, ModalProps } from 'antd'
import { FC } from 'react'

import { AttachmentListModel } from 'modules/attachment/models'

import AttachmentList from '../AttachmentList'

export type AttachmentListModalProps = Required<Pick<ModalProps, 'open' | 'title' | 'onCancel'>> & {
  data: AttachmentListModel
}

const AttachmentListModal: FC<AttachmentListModalProps> = ({ data, ...props }) => {
  return (
    <Modal {...props} data-testid='attachment-list-modal' width={370} footer={null}>
      <AttachmentList data={data} />
    </Modal>
  )
}

export default AttachmentListModal
