import { Modal, ModalProps } from 'antd'
import React, { FC } from 'react'

import Spinner from 'components/Spinner'
import { DEFAULT_MODAL_WIDTH } from 'shared/constants/components'

type ModalFallbackProps = Pick<ModalProps, 'visible' | 'onCancel'>

const ModalFallback: FC<ModalFallbackProps> = (props) => {
  return (
    <Modal
      width={DEFAULT_MODAL_WIDTH}
      {...props}
      destroyOnClose
      footer={null}
      maskClosable={false}
    >
      <Spinner dimension='block' />
    </Modal>
  )
}

export default ModalFallback
