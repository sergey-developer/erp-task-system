import { DownloadOutlined } from '@ant-design/icons'
import { Col, Divider, Row, Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { journalEntryTypeDict } from 'modules/task/constants/dict'
import { TaskJournalEntryModel } from 'modules/task/features/TaskView/models/taskJournal.model'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import { NO_DATA_MSG } from './constants'
import JournalEntry from './JournalEntry'

const { Text } = Typography

export type JournalProps = {
  data: Array<Omit<TaskJournalEntryModel, 'recordId' | 'task' | 'updatedAt'>>
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
                  <JournalEntry
                    data-testid='journalEntry'
                    createdAt={formatDate(item.createdAt, DATE_TIME_FORMAT)}
                    type={journalEntryTypeDict[item.type]}
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
