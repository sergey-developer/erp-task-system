import { Row, Typography } from 'antd'
import React, { FC } from 'react'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { commonEllipsisConfig } from 'shared/constants/text'
import formatDate from 'shared/utils/date/formatDate'

const { Text, Paragraph } = Typography

type JournalItemProps = {}

const JournalItem: FC<JournalItemProps> = () => {
  return (
    <Space direction='vertical' size='middle' $block>
      <Space direction='vertical'>
        <Text>{formatDate(Date.now(), DATE_TIME_FORMAT)}</Text>

        <Paragraph ellipsis={commonEllipsisConfig}>
          Выполнено переназначение
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
