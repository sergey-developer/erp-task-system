import { Modal, ModalProps } from 'antd'
import React, { FC } from 'react'

import Spinner from 'components/Spinner'

type ModalFallbackProps = Pick<ModalProps, 'open' | 'onCancel'>

const ModalFallback: FC<ModalFallbackProps> = (props) => {
  return (
    <Modal {...props} destroyOnClose footer={null} maskClosable={false}>
      <Spinner area='block' />
    </Modal>
  )
}

export default ModalFallback
