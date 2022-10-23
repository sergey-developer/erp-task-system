import { Button, Col, Divider, Row, Typography } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC } from 'react'

import { DownloadIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'
import useGetTaskJournal from 'modules/task/features/TaskView/hooks/useGetTaskJournal'
import useGetTaskJournalCsv from 'modules/task/features/TaskView/hooks/useGetTaskJournalCsv'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import {
  clickDownloadLink,
  makeDownloadLink,
} from 'shared/utils/common/downloadLink'
import formatDate from 'shared/utils/date/formatDate'

import { NO_DATA_MSG, journalEntryTypeDict } from './constants'
import JournalEntry from './JournalEntry'
import { getJournalCsvFilename } from './utils'

const { Text } = Typography

type JournalProps = {
  taskId: number
}

const Journal: FC<JournalProps> = ({ taskId }) => {
  const { data: journal = [], isFetching: journalIsFetching } =
    useGetTaskJournal(taskId)

  const {
    fn: getJournalCsv,
    state: { isFetching: journalCsvIsFetching },
  } = useGetTaskJournalCsv()

  const handleGetJournalCsv = async () => {
    try {
      const journalCsv = await getJournalCsv(taskId)

      const downloadLink = makeDownloadLink(
        journalCsv,
        'text/csv',
        getJournalCsvFilename(taskId),
      )

      clickDownloadLink(downloadLink)
    } catch {}
  }

  return (
    <LoadingArea data-testid='spinner-journal' isLoading={journalIsFetching}>
      <Space direction='vertical' $block>
        {!journalIsFetching && isEmpty(journal) ? (
          <Text>{NO_DATA_MSG}</Text>
        ) : (
          <>
            <Row justify='end'>
              <Button
                data-testid='journal-btn-download'
                type='link'
                onClick={handleGetJournalCsv}
                loading={journalCsvIsFetching}
                icon={
                  <DownloadIcon
                    data-testid='journal-icon-download'
                    $color='black'
                  />
                }
              />
            </Row>

            <Row>
              {journal.map((item, index, array) => {
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
          </>
        )}
      </Space>
    </LoadingArea>
  )
}

export default Journal
