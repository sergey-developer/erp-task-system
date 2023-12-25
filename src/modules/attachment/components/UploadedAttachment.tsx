import { PaperClipOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { prettyBytes } from 'shared/utils/file'

const { Text, Link } = Typography

type UploadedAttachmentProps = {
  id: NumberOrString
  name: string
  url: string
  size: number
  externalId?: MaybeNull<string>
}

const UploadedAttachment: FC<UploadedAttachmentProps> = ({ id, url, size, name, externalId }) => {
  return (
    <Space data-testid={`attachment-${name}`} key={id} size={4} wrap>
      <Link download href={url} target='_blank'>
        <Space>
          <PaperClipOutlined />
          {name}
        </Space>
      </Link>

      <Text>({prettyBytes(size)})</Text>

      {externalId === '' && <Text type='secondary'>Не передано в Х5</Text>}
    </Space>
  )
}

export default UploadedAttachment
