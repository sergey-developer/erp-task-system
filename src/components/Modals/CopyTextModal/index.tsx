import { ModalProps, Row } from 'antd'
import React, { FC } from 'react'

import CopyButton from 'components/Buttons/CopyButton'

import { ModalStyled } from './styles'

type CopyTextModalProps = Pick<ModalProps, 'visible' | 'onCancel'> & {
  text: string
  title: string
}

const CopyTextModal: FC<CopyTextModalProps> = (props) => {
  const { visible, title, text, onCancel } = props

  return (
    <ModalStyled
      visible={visible}
      title={
        <Row className='mr-30' justify='space-between' align='middle'>
          <span>{title}</span>
          <CopyButton type='link' value={text} />
        </Row>
      }
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      {text}
    </ModalStyled>
  )
}

export default CopyTextModal
