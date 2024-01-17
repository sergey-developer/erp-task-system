import { useSetState } from 'ahooks'
import { Button, Col, Radio, RadioGroupProps, Row, Select, SelectProps } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC } from 'react'

import { TaskJournalSourceEnum } from 'modules/task/constants/taskJournal'
import { useGetTaskJournal, useLazyGetTaskJournalCsv } from 'modules/task/hooks/taskJournal'
import { GetTaskJournalQueryArgs } from 'modules/task/models'

import { DownloadIcon, SyncIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { MimetypeEnum } from 'shared/constants/mimetype'
import { useSelectAll } from 'shared/hooks/useSelectAll'
import { IdType } from 'shared/types/common'
import { filterOptionBy } from 'shared/utils/common'
import { clickDownloadLink } from 'shared/utils/common/downloadLink'

import Journal from './Journal'
import { journalTypeOptions } from './constants'
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

  const onChangeType: SelectProps['onChange'] = (value: GetTaskJournalQueryArgs['types']) => {
    setTaskJournalQueryArgs({ types: value })
  }

  const selectProps = useSelectAll({
    showSelectAll: true,
    value: taskJournalQueryArgs.types,
    onChange: onChangeType,
    options: journalTypeOptions,
  })

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
    <LoadingArea data-testid='task-journal-loading' isLoading={journalIsFetching}>
      <Space data-testid='task-journal' direction='vertical' size='middle' $block>
        <Row justify='space-between' align='middle' gutter={[16, 8]}>
          <Col>
            <Row gutter={[16, 8]}>
              <Col>
                <Radio.Group
                  onChange={onChangeSourceSystem}
                  value={taskJournalQueryArgs.sourceSystems}
                >
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
                <Select
                  {...selectProps}
                  style={{ width: taskJournalQueryArgs.types?.length ? '100%' : 150 }}
                  placeholder='Выберите тип'
                  mode='multiple'
                  filterOption={filterOptionBy('label')}
                  popupMatchSelectWidth={300}
                />
              </Col>
            </Row>
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

        <Journal data={journal} />
      </Space>
    </LoadingArea>
  )
}

export default JournalTab
