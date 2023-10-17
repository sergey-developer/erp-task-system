import { Typography } from 'antd'
import React, { FC } from 'react'

import AttachmentList from 'modules/task/components/AttachmentList'
import { TaskModel } from 'modules/task/models'

import Space from 'components/Space'

import { renderStringWithLineBreak } from 'shared/utils/string'

const { Title, Paragraph } = Typography

export type DescriptionTabProps = Pick<
  TaskModel,
  'description' | 'attachments'
> & {
  title: string
}

const DescriptionTab: FC<DescriptionTabProps> = ({
  title,
  description,
  attachments = [],
}) => {
  return (
    <Space data-testid='task-description-tab' $block direction='vertical'>
      <Title level={5}>{title}</Title>

      {description && (
        <Paragraph>{renderStringWithLineBreak(description)}</Paragraph>
      )}

      {!!attachments?.length && <AttachmentList attachments={attachments} />}
    </Space>
  )
}

export default DescriptionTab
