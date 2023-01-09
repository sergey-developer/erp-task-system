import { Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import SeparatedText from 'components/Texts/SeparatedText'
import { TaskCommentModel } from 'modules/task/models'
import { renderStringWithLineBreak } from 'shared/utils/string'

const { Paragraph, Text } = Typography

export type CommentProps = Pick<TaskCommentModel, 'createdAt' | 'text'> & {
  author: string
}

const Comment: FC<CommentProps> = ({ text, createdAt, author }) => {
  return (
    <Space data-testid='task-comment' direction='vertical' $block>
      <SeparatedText>
        <Text type='secondary'>{author}</Text>
        <Text type='secondary'>{createdAt}</Text>
      </SeparatedText>

      <Paragraph>{renderStringWithLineBreak(text)}</Paragraph>
    </Space>
  )
}

export default Comment
