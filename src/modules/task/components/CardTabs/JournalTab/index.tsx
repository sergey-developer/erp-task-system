import { Button, Row } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC } from 'react'

import { useGetTaskJournal, useLazyGetTaskJournalCsv } from 'modules/task/hooks/taskJournal'

import { DownloadIcon, SyncIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { MimetypeEnum } from 'shared/constants/mimetype'
import { IdType } from 'shared/types/common'
import { clickDownloadLink } from 'shared/utils/common/downloadLink'

import Journal from './Journal'
import { getJournalCsvFilename } from './utils'

export type JournalTabProps = {
  taskId: IdType
}

const JournalTab: FC<JournalTabProps> = ({ taskId }) => {
  const {
    data: journal = [],
    isFetching: journalIsFetching,
    refetch: refetchJournal,
  } = useGetTaskJournal({ taskId })

  const [getJournalCsv, { isFetching: journalCsvIsFetching }] = useLazyGetTaskJournalCsv()

  const handleGetJournalCsv = async () => {
    try {
      const journalCsv = await getJournalCsv({ taskId }).unwrap()

      if (journalCsv) {
        clickDownloadLink(journalCsv, MimetypeEnum.Csv, getJournalCsvFilename(taskId))
      }
    } catch {}
  }

  return (
    <LoadingArea data-testid='journal-loading' isLoading={journalIsFetching}>
      <Space data-testid='task-journal' direction='vertical' $block>
        <Row justify='end'>
          <Space>
            {!isEmpty(journal) && (
              <Button
                data-testid='journal-btn-download'
                type='link'
                onClick={handleGetJournalCsv}
                loading={journalCsvIsFetching}
                icon={<DownloadIcon data-testid='journal-icon-download' $color='black' />}
              />
            )}

            <Button type='link' icon={<SyncIcon $color='black' />} onClick={refetchJournal} />
          </Space>
        </Row>

        <Journal data={journal} isLoading={journalIsFetching} />
      </Space>
    </LoadingArea>
  )
}

export default JournalTab
