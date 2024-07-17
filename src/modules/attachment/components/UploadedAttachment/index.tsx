import { PaperClipOutlined } from '@ant-design/icons'
import { Col, Flex, Space, Typography } from 'antd'
import React, { FC, MouseEvent } from 'react'

import { AttachmentListItem } from 'modules/attachment/components/Attachments/types'

import { DeleteIcon } from 'components/Icons'

import { getInfo, getInfoOpts } from './utils'

const { Text, Link } = Typography

type UploadedAttachmentProps = AttachmentListItem

const handleStopPropagation = (event: MouseEvent) => event.stopPropagation()

const UploadedAttachment: FC<UploadedAttachmentProps> = ({
  url,
  size,
  name,
  externalId,
  createdAt,
  createdBy,
  firstName,
  middleName,
  lastName,
  remove,
}) => {
  return (
    <Space size='middle'>
      <Space data-testid={`attachment-${name}`} size={4} wrap>
        <Link download={name} href={url} target='_blank' onClick={handleStopPropagation}>
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
              user: createdBy
                ? { ...createdBy, middleName: createdBy?.middleName ?? undefined }
                : firstName && lastName
                ? { firstName, middleName, lastName }
                : undefined,
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
