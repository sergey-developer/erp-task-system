import { PaperClipOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import { AttachmentListItem } from 'modules/task/components/AttachmentList/types'
import { getShortUserName } from 'modules/user/utils'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { MaybeNull } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'
import { prettyBytes } from 'shared/utils/file'

const { Text, Link } = Typography

const getInfo = (
  params: Pick<AttachmentListItem, 'size' | 'createdAt'> & {
    user: Pick<AttachmentListItem, 'firstName' | 'lastName' | 'middleName'>
  },
  opts: Record<keyof typeof params, (value?: any) => MaybeNull<string>>,
) =>
  Object.keys(params)
    .reduce<string[]>((acc, key) => {
      const paramKey = key as keyof typeof params
      const value = opts[paramKey](params[paramKey])
      if (value) acc.push(value)
      return acc
    }, [])
    .join(', ')

type UploadedAttachmentProps = AttachmentListItem

const UploadedAttachment: FC<UploadedAttachmentProps> = ({
  id,
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
    <Space data-testid={`attachment-${name}`} key={id} size={4} wrap>
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
            createdAt: undefined,
            user: { firstName: undefined, middleName: undefined, lastName: undefined },
          },
          {
            size: (value) => prettyBytes(value),
            createdAt: (value) => formatDate(value, DATE_FORMAT),
            user: (value) => getShortUserName(value),
          },
        )}
        )
      </Text>

      {externalId === '' && <Text type='secondary'>Не передано в Х5</Text>}
    </Space>
  )
}

export default UploadedAttachment
