import { Modal, ModalProps } from 'antd'
import { FC } from 'react'

import { DEFAULT_MODAL_WIDTH } from 'shared/constants/components'
import { BUTTON_TEXT_CANCEL } from 'shared/constants/text'

type BaseModalProps = ModalProps

const BaseModal: FC<BaseModalProps> = ({ children, ...props }) => {
  return (
    <Modal
      width={DEFAULT_MODAL_WIDTH}
      cancelText={BUTTON_TEXT_CANCEL}
      {...props}
    >
      {children}
    </Modal>
  )
}

export default BaseModal
