import { Modal, ModalProps, Row } from 'antd'
import React, { FC } from 'react'

import CopyButton from 'components/Buttons/CopyButton'
import { DEFAULT_MODAL_WIDTH } from 'shared/constants/components'

type TextModalProps = Pick<ModalProps, 'visible' | 'title' | 'onCancel'> & {
  text: string
}

const CopyTextModal: FC<TextModalProps> = (props) => {
  const { visible, title, text, onCancel } = props

  return (
    <Modal
      visible={visible}
      width={DEFAULT_MODAL_WIDTH}
      title={
        <Row className='margin-r-20' justify='space-between' align='middle'>
          <span>{title}</span>
          <CopyButton type='link' value={text} />
        </Row>
      }
      onCancel={onCancel}
      footer={null}
    >
      {text}
    </Modal>
  )
}

export default CopyTextModal
