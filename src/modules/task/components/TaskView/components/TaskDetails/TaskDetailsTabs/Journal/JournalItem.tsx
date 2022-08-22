import { Row, Space, Typography } from 'antd'
import React, { FC } from 'react'

import LabeledData from 'components/LabeledData'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { commonEllipsisConfig } from 'shared/constants/text'
import formatDate from 'shared/utils/date/formatDate'

const { Text, Paragraph } = Typography

type JournalItemProps = {}

const JournalItem: FC<JournalItemProps> = () => {
  return (
    <Space direction='vertical' size='middle'>
      <Space direction='vertical'>
        <Text>{formatDate(Date.now(), DATE_TIME_FORMAT)}</Text>

        <Paragraph ellipsis={commonEllipsisConfig}>
          Выполнено переназначение на исполнителя Константинопольский Константин
          Константинович
        </Paragraph>
      </Space>

      <Row justify='space-between'>
        <LabeledData label='Тип'>
          <Text>Переназначение</Text>
        </LabeledData>

        <LabeledData label='Где добавлено'>
          <Text>Х5</Text>
        </LabeledData>

        <LabeledData label='Кем добавлено'>
          <Text>Александров Александр Александрович</Text>
        </LabeledData>
      </Row>
    </Space>
  )
}

export default JournalItem
