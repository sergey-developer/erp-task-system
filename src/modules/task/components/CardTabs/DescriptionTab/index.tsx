import { Typography } from 'antd'
import React, { FC } from 'react'

import AttachmentList from 'modules/task/components/AttachmentList'
import { TaskModel } from 'modules/task/models'

import Space from 'components/Space'

import { renderStringWithLineBreak } from 'shared/utils/string'

import { TitleStyled } from './style'

const { Paragraph } = Typography

export type DescriptionTabProps = Pick<TaskModel, 'description' | 'attachments'> & {
  title: string
  taskTitle: string
}

const DescriptionTab: FC<DescriptionTabProps> = ({
  title,
  taskTitle,
  description,
  attachments = [],
}) => {
  return (
    <Space data-testid='task-description-tab' $block direction='vertical'>
      <TitleStyled level={5} copyable={{ text: `${taskTitle}\n\n${description}` }}>
        {title}
      </TitleStyled>

      {description && <Paragraph>{renderStringWithLineBreak(description)}</Paragraph>}

      {!!attachments?.length && <AttachmentList attachments={attachments} />}
    </Space>
  )
}

export default DescriptionTab
