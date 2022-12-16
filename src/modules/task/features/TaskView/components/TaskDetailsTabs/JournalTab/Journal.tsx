import { Divider, Typography } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC } from 'react'

import Space from 'components/Space'
import { TaskJournalModel } from 'modules/task/features/TaskView/models'
import { getFullUserName } from 'modules/user/utils'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import { NO_DATA_MSG, journalEntryTypeDict } from './constants'
import JournalEntry from './JournalEntry'

const { Text } = Typography

type JournalProps = {
  data: TaskJournalModel
  isLoading: boolean
}

const Journal: FC<JournalProps> = ({ data, isLoading }) => {
  return (
    <Space direction='vertical' size='large' $block>
      {!isLoading && isEmpty(data) ? (
        <Text>{NO_DATA_MSG}</Text>
      ) : (
        data.map((item, index, array) => {
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
        })
      )}
    </Space>
  )
}

export default Journal
