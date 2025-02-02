import { Space } from 'antd'
import UploadedAttachment from 'features/attachments/components/UploadedAttachment'
import React, { FC } from 'react'

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
