import { Modal, ModalProps } from 'antd'
import React, { FC } from 'react'

import Spinner, { SpinnerProps } from 'components/Spinner'

type ModalFallbackProps = Pick<ModalProps, 'open' | 'onCancel'> & Pick<SpinnerProps, 'tip'>

const ModalFallback: FC<ModalFallbackProps> = ({ tip, ...props }) => {
  return (
    <Modal {...props} destroyOnClose footer={null} maskClosable={false}>
      <Spinner area='block' tip={tip} />
    </Modal>
  )
}

export default ModalFallback
