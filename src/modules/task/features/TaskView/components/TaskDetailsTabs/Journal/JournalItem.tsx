import { Row, Typography } from 'antd'
import React, { FC } from 'react'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import { TaskJournalItemModel } from 'modules/task/features/TaskView/models/taskJournal.model'
import { commonEllipsisConfig } from 'shared/constants/text'
import { MaybeNull } from 'shared/interfaces/utils'

const { Text, Paragraph } = Typography

export type JournalItemProps = Omit<TaskJournalItemModel, 'id' | 'author'> & {
  author: MaybeNull<string>
}

const JournalItem: FC<JournalItemProps> = ({
  createdAt,
  sourceSystem,
  type,
  description,
  author,
  ...props
}) => {
  return (
    <Space direction='vertical' size='middle' $block {...props}>
      <Space direction='vertical'>
        <Text>{createdAt}</Text>

        <Paragraph ellipsis={commonEllipsisConfig}>{description}</Paragraph>
      </Space>

      <Row justify='space-between'>
        <LabeledData label='Тип'>
          <Text>{type}</Text>
        </LabeledData>

        <LabeledData label='Где добавлено'>
          <Text>{sourceSystem}</Text>
        </LabeledData>

        {author && (
          <LabeledData data-testid='journalItem-author' label='Кем добавлено'>
            <Text>{author}</Text>
          </LabeledData>
        )}
      </Row>
    </Space>
  )
}

export default JournalItem
