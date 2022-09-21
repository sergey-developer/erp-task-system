import { Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import { TaskJournalEntryModel } from 'modules/task/features/TaskView/models'
import { commonEllipsisConfig } from 'shared/constants/text'
import { MaybeNull } from 'shared/interfaces/utils'

import { Description } from './styles'

const { Text } = Typography

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
        <Text strong>{createdAt}</Text>

        <Description ellipsis={commonEllipsisConfig}>{description}</Description>
      </Space>

      <Row>
        <Col span={8}>
          <LabeledData label='Тип'>
            <Text>{type}</Text>
          </LabeledData>
        </Col>

        <Col span={8}>
          <LabeledData label='Где добавлено'>
            <Text>{sourceSystem}</Text>
          </LabeledData>
        </Col>

        {author && (
          <Col span={8}>
            <LabeledData
              data-testid='journalEntry-author'
              label='Кем добавлено'
            >
              <Text>{author}</Text>
            </LabeledData>
          </Col>
        )}
      </Row>
    </Space>
  )
}

export default JournalEntry
