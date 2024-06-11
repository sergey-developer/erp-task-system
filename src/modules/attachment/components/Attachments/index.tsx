import { Space } from 'antd'
import React, { FC } from 'react'

import UploadedAttachment from 'modules/attachment/components/UploadedAttachment'

import { AttachmentsProps } from './types'

const Attachments: FC<AttachmentsProps> = ({ data }) => {
  return (
    <Space data-testid='attachments' direction='vertical'>
      {data.map((att, index) => (
        <UploadedAttachment key={att.id || index} {...att} />
      ))}
    </Space>
  )
}

export default Attachments
