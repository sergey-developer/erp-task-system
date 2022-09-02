import { Row, Typography } from 'antd'
import React, { FC } from 'react'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import { TaskJournalEntryModel } from 'modules/task/features/TaskView/models'
import { commonEllipsisConfig } from 'shared/constants/text'
import { MaybeNull } from 'shared/interfaces/utils'

const { Text, Paragraph } = Typography

export type JournalEntryProps = Pick<
  TaskJournalEntryModel,
  'createdAt' | 'description' | 'sourceSystem'
> & {
  type: string
  author: MaybeNull<string>
}

const JournalEntry: FC<JournalEntryProps> = ({
  createdAt,
  sourceSystem,
  type,
  description,
  author,
}) => {
  return (
    <Space data-testid='journalEntry' direction='vertical' size='middle' $block>
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
          <LabeledData data-testid='journalEntry-author' label='Кем добавлено'>
            <Text>{author}</Text>
          </LabeledData>
        )}
      </Row>
    </Space>
  )
}

export default JournalEntry
