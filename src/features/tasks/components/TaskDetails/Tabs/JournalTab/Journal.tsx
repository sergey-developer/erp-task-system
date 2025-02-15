import { Divider, Typography } from 'antd'
import { TaskJournalDTO } from 'features/tasks/api/dto'
import { getFullUserName } from 'features/users/helpers'
import isEmpty from 'lodash/isEmpty'
import React, { FC } from 'react'

import Space from 'components/Space'

import { checkLastItem } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import JournalEntry from './JournalEntry'
import { journalEntryTypeDict, NO_DATA_MSG } from './constants'

const { Text } = Typography

type JournalProps = {
  data: TaskJournalDTO
}

const Journal: FC<JournalProps> = ({ data }) => {
  return (
    <Space direction='vertical' size='large' $block>
      {isEmpty(data) ? (
        <Text>{NO_DATA_MSG}</Text>
      ) : (
        data.map((item, index, array) => (
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

            {!checkLastItem(index, array) && <Divider />}
          </Space>
        ))
      )}
    </Space>
  )
}

export default Journal
