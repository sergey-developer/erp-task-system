import { Space } from 'antd'
import React, { FC } from 'react'

import UploadedAttachment from 'features/attachment/components/UploadedAttachment'

import { AttachmentsProps } from './types'

const Attachments: FC<AttachmentsProps> = ({ data, showAboutInPopover = false }) => {
  return (
    <Space data-testid='attachments' direction='vertical'>
      {data.map((att, index) => (
        <UploadedAttachment
          key={att.id || index}
          {...att}
          showAboutInPopover={showAboutInPopover}
        />
      ))}
    </Space>
  )
}

export default Attachments
