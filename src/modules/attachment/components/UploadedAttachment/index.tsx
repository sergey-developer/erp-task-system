import { PaperClipOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Space, Typography } from 'antd'
import React, { FC } from 'react'

import { AttachmentListItem } from 'modules/attachment/components/Attachments/types'

import { DeleteIcon } from 'components/Icons'

import { getInfo, getInfoOpts } from './utils'

const { Text, Link } = Typography

type UploadedAttachmentProps = AttachmentListItem &
  Partial<{
    showDelete: boolean
    canDelete: boolean
  }>

const UploadedAttachment: FC<UploadedAttachmentProps> = ({
  name,
  url,
  size,
  externalId,
  createdAt,
  firstName,
  middleName,
  lastName,
  remove,
  showDelete = true,
  canDelete = true,
}) => {
  return (
    <Space size='middle' align='center'>
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

      {remove && showDelete && (
        <Col>
          <Button
            type='text'
            disabled={!canDelete}
            icon={
              <DeleteIcon
                $cursor='pointer'
                $color='fireOpal'
                onClick={remove}
                title='Удалить файл'
              />
            }
          />
        </Col>
      )}
    </Space>
  )
}

export default UploadedAttachment
