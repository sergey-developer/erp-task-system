import { Row, Typography } from 'antd'
import React, { FC } from 'react'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import { TaskJournalItemModel } from 'modules/task/components/TaskView/models/taskJournal.model'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { commonEllipsisConfig } from 'shared/constants/text'
import formatDate from 'shared/utils/date/formatDate'

const { Text, Paragraph } = Typography

type JournalItemProps = Omit<TaskJournalItemModel, 'id'>

const JournalItem: FC<JournalItemProps> = ({
  createdAt,
  sourceSystem,
  type,
  description,
  author,
}) => {
  return (
    <Space direction='vertical' size='middle' $block>
      <Space direction='vertical'>
        <Text data-testid='journal-createdAt'>
          {formatDate(createdAt, DATE_TIME_FORMAT)}
        </Text>

        <Paragraph
          data-testid='journal-description'
          ellipsis={commonEllipsisConfig}
        >
          {description}
        </Paragraph>
      </Space>

      <Row justify='space-between'>
        <LabeledData data-testid='journal-type' label='Тип'>
          <Text>{type}</Text>
        </LabeledData>

        <LabeledData data-testid='journal-sourceSystem' label='Где добавлено'>
          <Text>{sourceSystem}</Text>
        </LabeledData>

        {author && (
          <LabeledData data-testid='journal-author' label='Кем добавлено'>
            <Text>{getFullUserName(author)}</Text>
          </LabeledData>
        )}
      </Row>
    </Space>
  )
}

export default JournalItem
