import { Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import AttachmentList from 'modules/task/features/AttachmentList'
import { TaskJournalEntryModel } from 'modules/task/models'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'

import { commonEllipsisConfig } from 'shared/constants/text'
import { MaybeNull } from 'shared/interfaces/utils'
import { renderStringWithLineBreak } from 'shared/utils/string'

import { Description } from './styles'

const { Text } = Typography

export type JournalEntryProps = Pick<
  TaskJournalEntryModel,
  'createdAt' | 'description' | 'sourceSystem' | 'attachments'
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
  attachments,
}) => {
  return (
    <Space data-testid='journalEntry' direction='vertical' size='middle' $block>
      <Space direction='vertical'>
        <Text strong>{createdAt}</Text>

        <Description ellipsis={commonEllipsisConfig}>
          {renderStringWithLineBreak(description)}
        </Description>
      </Space>

      {!!attachments.length && (
        <Space direction='vertical'>
          <Description>Добавлен комментарий</Description>
          <AttachmentList attachments={attachments} />
        </Space>
      )}

      <Row gutter={10}>
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
