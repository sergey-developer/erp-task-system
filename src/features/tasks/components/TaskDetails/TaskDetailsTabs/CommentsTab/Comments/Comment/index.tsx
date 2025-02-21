import { Typography } from 'antd'
import Attachments from 'features/attachments/components/Attachments'
import { TaskCommentDTO } from 'features/tasks/api/dto'
import React, { FC } from 'react'

import SeparatedText from 'components/SeparatedText'
import Space from 'components/Space'

import { renderStringWithLineBreak } from 'shared/utils/string'

const { Paragraph, Text } = Typography

export type CommentProps = Pick<TaskCommentDTO, 'createdAt' | 'text' | 'attachments'> & {
  author: string
}

const Comment: FC<CommentProps> = ({ text, createdAt, author, attachments }) => {
  return (
    <Space data-testid='task-taskComment' direction='vertical' $block>
      <SeparatedText>
        <Text type='secondary'>{author}</Text>
        <Text type='secondary'>{createdAt}</Text>
      </SeparatedText>

      <Paragraph>{renderStringWithLineBreak(text)}</Paragraph>

      <Attachments data={attachments} />
    </Space>
  )
}

export default Comment
