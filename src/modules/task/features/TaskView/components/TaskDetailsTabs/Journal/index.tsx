import { DownloadOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Typography } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC } from 'react'

import LoadableData from 'components/LoadableData'
import Space from 'components/Space'
import { journalEntryTypeDict } from 'modules/task/constants/dict'
import useGetTaskJournal from 'modules/task/features/TaskView/hooks/useGetTaskJournal'
import { getTaskJournalCsvUrl } from 'modules/task/utils/apiUrls'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import { NO_DATA_MSG } from './constants'
import JournalEntry from './JournalEntry'

const { Text } = Typography

type JournalProps = {
  taskId: number
}

const Journal: FC<JournalProps> = ({ taskId }) => {
  const { data = [], isFetching } = useGetTaskJournal(taskId)

  return (
    <LoadableData
      data-testid='spinner-journal'
      isLoading={isFetching}
      noContent={isEmpty(data) && <Text>{NO_DATA_MSG}</Text>}
    >
      <Space direction='vertical' $block>
        <Row justify='end'>
          <Button
            data-testid='journal-btn-download'
            type='link'
            href={getTaskJournalCsvUrl(taskId)}
            download={`csv-заявка-${taskId}`}
            icon={
              <DownloadOutlined
                data-testid='journal-icon-download'
                style={{ color: 'black' }}
              />
            }
          />
        </Row>

        <Row>
          {data.map((item, index, array) => {
            const isLastItem: boolean = index === array.length - 1

            return (
              <Col key={item.id} span={24}>
                <JournalEntry
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
      </Space>
    </LoadableData>
  )
}

export default Journal
