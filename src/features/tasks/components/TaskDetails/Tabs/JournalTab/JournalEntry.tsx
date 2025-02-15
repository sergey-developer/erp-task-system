import { Col, Row, Typography } from 'antd'
import Attachments from 'features/attachments/components/Attachments'
import { TaskJournalItemDTO } from 'features/tasks/api/dto'
import React, { FC } from 'react'

import Label from 'components/Label'
import Space from 'components/Space'

import { commonEllipsisConfig } from 'shared/constants/common'
import { MaybeNull } from 'shared/types/utils'
import { renderStringWithLineBreak } from 'shared/utils/string'

import { Description } from './styles'

const { Text } = Typography

export type JournalEntryProps = Pick<
  TaskJournalItemDTO,
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
          <Attachments data={attachments} />
        </Space>
      )}

      <Row gutter={10}>
        <Col span={8}>
          <Label label='Тип'>
            <Text>{type}</Text>
          </Label>
        </Col>

        <Col span={8}>
          <Label label='Где добавлено'>
            <Text>{sourceSystem}</Text>
          </Label>
        </Col>

        {author && (
          <Col span={8}>
            <Label label='Кем добавлено'>
              <Text>{author}</Text>
            </Label>
          </Col>
        )}
      </Row>
    </Space>
  )
}

export default JournalEntry
