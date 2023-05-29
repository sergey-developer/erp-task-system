import { PaperClipOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskAttachmentModel } from 'modules/task/models'

import { prettyBytes } from 'shared/utils/file'

const { Link, Text } = Typography

export type AttachmentListProps = {
  attachments: Array<TaskAttachmentModel>
}

const AttachmentList: FC<AttachmentListProps> = ({ attachments }) => {
  return (
    <Space data-testid='attachment-list' direction='vertical'>
      {attachments.map((att, index) => (
        <Space data-testid={`attachment-${att.name}`} key={index}>
          <Link download href={att.url}>
            <Space>
              <PaperClipOutlined />
              {att.name}
            </Space>
          </Link>

          <Text>({prettyBytes(att.size)})</Text>

          {!att.externalId && <Text type='secondary'>Не передано в Х5</Text>}
        </Space>
      ))}
    </Space>
  )
}

export default AttachmentList
