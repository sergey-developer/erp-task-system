import { PaperClipOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import { AttachmentListItem } from 'modules/task/components/AttachmentList/types'

import { getInfo, getInfoOpts } from './utils'

const { Text, Link } = Typography

type UploadedAttachmentProps = AttachmentListItem

const UploadedAttachment: FC<UploadedAttachmentProps> = ({
  url,
  size,
  name,
  externalId,
  createdAt,
  firstName,
  middleName,
  lastName,
}) => {
  return (
    <Space data-testid={`attachment-${name}`} size={4} wrap>
      <Link download href={url} target='_blank'>
        <Space>
          <PaperClipOutlined />
          {name}
        </Space>
      </Link>

      <Text>
        (
        {getInfo(
          {
            size,
            createdAt,
            user: firstName && lastName ? { firstName, middleName, lastName } : undefined,
          },
          getInfoOpts,
        )}
        )
      </Text>

      {externalId === '' && <Text type='secondary'>Не передано в Х5</Text>}
    </Space>
  )
}

export default UploadedAttachment
