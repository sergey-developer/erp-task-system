import { Space } from 'antd'
import React, { FC } from 'react'

import UploadedAttachment from 'modules/attachment/components/UploadedAttachment'

import { AttachmentListProps } from './types'

// todo: перенести в modules/attachment
const AttachmentList: FC<AttachmentListProps> = ({ data }) => {
  return (
    <Space data-testid='attachment-list' direction='vertical'>
      {data.map((att, index) => (
        <UploadedAttachment key={att.id || index} {...att} />
      ))}
    </Space>
  )
}

export default AttachmentList
