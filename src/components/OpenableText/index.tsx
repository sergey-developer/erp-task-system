import { useBoolean } from 'ahooks'
import { Button, Space, Typography } from 'antd'
import { EllipsisConfig } from 'antd/es/typography/Base'
import React, { FC } from 'react'

import CopyTextModal from 'components/Modals/CopyTextModal'

const { Paragraph } = Typography

type OpenableTextProps = Pick<EllipsisConfig, 'rows'> & {
  text: string
  modalTitle: string
  className?: string
}

const OpenableText: FC<OpenableTextProps> = ({
  text,
  rows,
  modalTitle,
  className,
}) => {
  const [textHasEllipsis, { setTrue: setTextHasEllipsis }] = useBoolean(false)
  const [isModalOpened, { toggle: toggleModalOpened }] = useBoolean(false)

  return (
    <div className={className}>
      <Space direction='vertical'>
        <Paragraph
          className='mb-0'
          ellipsis={{
            rows,
            onEllipsis: setTextHasEllipsis,
          }}
        >
          {text}
        </Paragraph>

        {textHasEllipsis && (
          <Button type='link' onClick={toggleModalOpened}>
            Читать полностью
          </Button>
        )}
      </Space>

      <CopyTextModal
        title={modalTitle}
        visible={isModalOpened}
        text={text}
        onCancel={toggleModalOpened}
      />
    </div>
  )
}

OpenableText.defaultProps = {
  rows: 5,
}

export default OpenableText
