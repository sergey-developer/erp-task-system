import { Divider } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { TaskJournalModel } from 'modules/task/features/TaskView/models/taskJournal.model'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import { journalEntryTypeDict } from './constants'
import JournalEntry from './JournalEntry'

type JournalProps = {
  data: TaskJournalModel
}

const Journal: FC<JournalProps> = ({ data }) => {
  return (
    <Space direction='vertical' size='large'>
      {data.map((item, index, array) => {
        const isLastItem: boolean = index === array.length - 1

        return (
          <Space key={item.id} direction='vertical' size='large' $block>
            <JournalEntry
              createdAt={formatDate(item.createdAt, DATE_TIME_FORMAT)}
              type={journalEntryTypeDict[item.type]}
              author={item.author ? getFullUserName(item.author) : null}
              description={item.description}
              sourceSystem={item.sourceSystem}
            />

            {!isLastItem && <Divider />}
          </Space>
        )
      })}
    </Space>
  )
}

export default Journal
