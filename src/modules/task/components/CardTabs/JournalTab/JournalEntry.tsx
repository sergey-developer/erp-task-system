import { Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import AttachmentList from 'modules/task/components/AttachmentList'
import { TaskJournalEntryModel } from 'modules/task/models'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'

import { commonEllipsisConfig } from 'shared/constants/common'
import { MaybeNull } from 'shared/types/utils'
import { renderStringWithLineBreak } from 'shared/utils/string'

import { Description } from './styles'

const { Text } = Typography

export type JournalEntryProps = Pick<
  TaskJournalEntryModel,
  'id' | 'createdAt' | 'description' | 'sourceSystem' | 'attachments'
> & {
  type: string
  author: MaybeNull<string>
}

const JournalEntry: FC<JournalEntryProps> = ({
  id,
  createdAt,
  sourceSystem,
  type,
  description,
  author,
  attachments,
}) => {
  return (
    <Space data-testid={`journal-entry-${id}`} direction='vertical' size='middle' $block>
      <Space direction='vertical'>
        <Text strong>{createdAt}</Text>

        <Description ellipsis={commonEllipsisConfig}>
          {renderStringWithLineBreak(description)}
        </Description>
      </Space>

      {!!attachments?.length && (
        <Space direction='vertical'>
          <AttachmentList data={attachments} />
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
            <LabeledData label='Кем добавлено'>
              <Text>{author}</Text>
            </LabeledData>
          </Col>
        )}
      </Row>
    </Space>
  )
}

export default JournalEntry
