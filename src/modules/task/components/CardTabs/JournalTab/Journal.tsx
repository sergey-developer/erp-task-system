import { Divider, Typography } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC } from 'react'

import { TaskJournalModel } from 'modules/task/models'
import { getFullUserName } from 'modules/user/utils'

import Space from 'components/Space'

import { formatDate } from 'shared/utils/date'

import JournalEntry from './JournalEntry'
import { NO_DATA_MSG, journalEntryTypeDict } from './constants'

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
                id={item.id}
                createdAt={formatDate(item.createdAt)}
                type={journalEntryTypeDict[item.type]}
                author={item.author ? getFullUserName(item.author) : null}
                description={item.description}
                sourceSystem={item.sourceSystem}
                attachments={item.attachments}
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
