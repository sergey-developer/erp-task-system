import { Button, Row } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC } from 'react'

import { DownloadIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'
import useGetTaskJournal from 'modules/task/features/TaskView/hooks/useGetTaskJournal'
import useGetTaskJournalCsv from 'modules/task/features/TaskView/hooks/useGetTaskJournalCsv'
import {
  clickDownloadLink,
  makeDownloadLink,
} from 'shared/utils/common/downloadLink'

import Journal from './Journal'
import { getJournalCsvFilename } from './utils'

export type JournalTabProps = {
  taskId: number
}

const JournalTab: FC<JournalTabProps> = ({ taskId }) => {
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
        {!journalIsFetching && !isEmpty(journal) && (
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
        )}

        <Journal data={journal} isLoading={journalIsFetching} />
      </Space>
    </LoadingArea>
  )
}

export default JournalTab
