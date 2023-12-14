import { PaperClipOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskAttachmentListModel } from 'modules/task/models'

import { prettyBytes } from 'shared/utils/file'

const { Link, Text } = Typography

export type AttachmentListProps = {
  data: TaskAttachmentListModel
}

const AttachmentList: FC<AttachmentListProps> = ({ data }) => {
  return (
    <Space data-testid='attachment-list' direction='vertical'>
      {data.map((att, index) => (
        <Space data-testid={`attachment-${att.name}`} key={index} size={4} wrap>
          <Link download href={att.url} target='_blank'>
            <Space>
              <PaperClipOutlined />
              {att.name}
            </Space>
          </Link>

          <Text>({prettyBytes(att.size)})</Text>

          {att.externalId === '' && <Text type='secondary'>Не передано в Х5</Text>}
        </Space>
      ))}
    </Space>
  )
}

export default AttachmentList
