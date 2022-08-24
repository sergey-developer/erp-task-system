import { DownloadOutlined } from '@ant-design/icons'
import { Col, Divider, Row, Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { TaskJournalModel } from 'modules/task/components/TaskView/models/taskJournal.model'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import { NO_DATA_MSG } from './constants'
import JournalItem from './JournalItem'

const { Text } = Typography

type JournalProps = {
  data: TaskJournalModel
}

const Journal: FC<JournalProps> = ({ data }) => {
  return (
    <Space direction='vertical' $block>
      {!!data.length ? (
        <>
          <Row justify='end'>
            <DownloadOutlined data-testid='journal-icon-download' />
          </Row>

          <Row>
            {data.map((item, index, array) => {
              const isLastItem: boolean = index === array.length - 1

              return (
                <Col key={item.id} span={24}>
                  <JournalItem
                    data-testid='journalItem'
                    createdAt={formatDate(item.createdAt, DATE_TIME_FORMAT)}
                    type={item.type}
                    author={item.author ? getFullUserName(item.author) : null}
                    description={item.description}
                    sourceSystem={item.sourceSystem}
                  />

                  {!isLastItem && <Divider />}
                </Col>
              )
            })}
          </Row>
        </>
      ) : (
        <Text>{NO_DATA_MSG}</Text>
      )}
    </Space>
  )
}

export default Journal
