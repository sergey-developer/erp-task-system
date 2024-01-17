import { useSetState } from 'ahooks'
import { Button, Col, Radio, RadioGroupProps, Row } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC } from 'react'

import { TaskJournalSourceEnum } from 'modules/task/constants/taskJournal'
import { useGetTaskJournal, useLazyGetTaskJournalCsv } from 'modules/task/hooks/taskJournal'
import { GetTaskJournalQueryArgs } from 'modules/task/models'

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
  const [taskJournalQueryArgs, setTaskJournalQueryArgs] = useSetState<GetTaskJournalQueryArgs>({
    taskId,
  })

  const {
    data: journal = [],
    isFetching: journalIsFetching,
    refetch: refetchJournal,
  } = useGetTaskJournal(taskJournalQueryArgs)

  const [getJournalCsv, { isFetching: journalCsvIsFetching }] = useLazyGetTaskJournalCsv()

  const handleGetJournalCsv = async () => {
    try {
      const journalCsv = await getJournalCsv({ taskId }).unwrap()

      if (journalCsv) {
        clickDownloadLink(journalCsv, MimetypeEnum.Csv, getJournalCsvFilename(taskId))
      }
    } catch {}
  }

  const onChangeSourceSystem: RadioGroupProps['onChange'] = (event) => {
    setTaskJournalQueryArgs({ sourceSystems: event.target.value })
  }

  return (
    <LoadingArea data-testid='journal-loading' isLoading={false}>
      <Space data-testid='task-journal' direction='vertical' size='middle' $block>
        <Row justify='space-between' align='middle'>
          <Col>
            <Radio.Group onChange={onChangeSourceSystem}>
              <Radio.Button>Все</Radio.Button>

              <Radio.Button value={TaskJournalSourceEnum.X5}>
                {TaskJournalSourceEnum.X5}
              </Radio.Button>

              <Radio.Button value={TaskJournalSourceEnum.ITSM}>
                {TaskJournalSourceEnum.ITSM}
              </Radio.Button>
            </Radio.Group>
          </Col>

          <Col>
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
          </Col>
        </Row>

        <Journal data={journal} isLoading={journalIsFetching} />
      </Space>
    </LoadingArea>
  )
}

export default JournalTab
