import { Modal, ModalProps } from 'antd'
import React, { FC } from 'react'

import Spinner from 'components/Spinner'

type ModalFallbackProps = Pick<ModalProps, 'visible' | 'onCancel'>

const ModalFallback: FC<ModalFallbackProps> = (props) => {
  return (
    <Modal
      destroyOnClose
      {...props}
      footer={null}
      maskClosable={false}
    >
      <Spinner area='block' />
    </Modal>
  )
}

export default ModalFallback
