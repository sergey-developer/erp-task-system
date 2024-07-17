import { PaperClipOutlined } from '@ant-design/icons'
import { Col, Flex, Popover, Space, Typography } from 'antd'
import React, { FC, MouseEvent } from 'react'

import {
  AttachmentListItem,
  AttachmentsProps,
} from 'modules/attachment/components/Attachments/types'
import { getShortUserName } from 'modules/user/utils'

import { DeleteIcon } from 'components/Icons'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'
import { prettyBytes } from 'shared/utils/file'

import { getInfo, getInfoOpts } from './utils'

const { Text, Link } = Typography

type UploadedAttachmentProps = AttachmentListItem & Pick<AttachmentsProps, 'showAboutInPopover'>

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
  showAboutInPopover,
}) => {
  const link = (
    <Link download={name} href={url} target='_blank'>
      <Flex gap='small'>
        <PaperClipOutlined />
        {name}
      </Flex>
    </Link>
  )

  const createdByResult = createdBy
    ? { ...createdBy, middleName: createdBy?.middleName ?? undefined }
    : firstName && lastName
    ? { firstName, middleName, lastName }
    : undefined

  return (
    <Space size='middle' onClick={handleStopPropagation}>
      <Space data-testid={`attachment-${name}`} size={4} wrap>
        {showAboutInPopover ? (
          <Popover
            content={
              <Flex vertical gap='small'>
                <Flex gap='small'>
                  <Text type='secondary'>Автор:</Text>
                  {createdByResult && <Text>{getShortUserName(createdByResult)}</Text>}
                </Flex>

                <Flex gap='small'>
                  <Text type='secondary'>Добавлено:</Text>
                  <Text>{formatDate(createdAt, DATE_FORMAT)}</Text>
                </Flex>

                <Flex gap='small'>
                  <Text type='secondary'>Размер:</Text>
                  <Text>{prettyBytes(size)}</Text>
                </Flex>
              </Flex>
            }
          >
            {link}
          </Popover>
        ) : (
          link
        )}

        {!showAboutInPopover && (
          <Text>({getInfo({ size, createdAt, user: createdByResult }, getInfoOpts)})</Text>
        )}

        {!showAboutInPopover && externalId === '' && <Text type='secondary'>Не передано в Х5</Text>}
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
