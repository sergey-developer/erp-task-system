import { PaperClipOutlined } from '@ant-design/icons'
import { Col, Space, Typography } from 'antd'
import React, { FC } from 'react'

import { DeleteIcon } from 'components/Icons'

import { MaybeNull, NumberOrString } from 'shared/types/utils'
import { prettyBytes } from 'shared/utils/file'

const { Text, Link } = Typography

type UploadedAttachmentProps = {
  id: NumberOrString
  name: string
  url: string
  size: number
  remove?: () => void
  externalId?: MaybeNull<string>
}

const UploadedAttachment: FC<UploadedAttachmentProps> = ({
  id,
  url,
  size,
  name,
  externalId,
  remove,
}) => {
  return (
    <Space size='middle'>
      <Space data-testid={`attachment-${name}`} key={id} size={4} wrap>
        <Link download={name} href={url} target='_blank'>
          <Space>
            <PaperClipOutlined />
            {name}
          </Space>
        </Link>

        <Text>({prettyBytes(size)})</Text>

        {externalId === '' && <Text type='secondary'>Не передано в Х5</Text>}
      </Space>

      {remove && (
        <Col>
          <DeleteIcon $cursor='pointer' onClick={remove} title='Удалить файл' />
        </Col>
      )}
    </Space>
  )
}

export default UploadedAttachment
