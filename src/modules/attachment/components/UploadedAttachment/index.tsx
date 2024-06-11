import { PaperClipOutlined } from '@ant-design/icons'
import { Col, Flex, Space, Typography } from 'antd'
import React, { FC } from 'react'

import { AttachmentListItem } from 'modules/attachment/components/Attachments/types'

import { DeleteIcon } from 'components/Icons'

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
  remove,
}) => {
  return (
    <Space size='middle'>
      <Space data-testid={`attachment-${name}`} size={4} wrap>
        <Link download={name} href={url} target='_blank'>
          <Flex gap='small'>
            <PaperClipOutlined />
            {name}
          </Flex>
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

      {remove && (
        <Col>
          <DeleteIcon $cursor='pointer' onClick={remove} title='Удалить файл' />
        </Col>
      )}
    </Space>
  )
}

export default UploadedAttachment
