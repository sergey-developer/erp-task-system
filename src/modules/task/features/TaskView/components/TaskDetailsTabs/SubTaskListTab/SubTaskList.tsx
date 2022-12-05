import { Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import SubTask from './SubTask'

const { Text } = Typography

type SubTaskListProps = {
  // data: Array<SubTaskModel>
  data: any[]
}

const SubTaskList: FC<SubTaskListProps> = ({ data }) => {
  return (
    <Space $block direction='vertical'>
      {data.length ? (
        <Space $block direction='vertical' size='large'>
          {data.map((subTask) => (
            <SubTask
              title={subTask.title}
              description={subTask.description}
              recordId={subTask.recordId}
              olaNextBreachTime={formatDate(
                subTask.olaNextBreachTime,
                DATE_TIME_FORMAT,
              )}
              status={subTask.status}
              createdAt={formatDate(subTask.createdAt, DATE_TIME_FORMAT)}
              workGroup={subTask.workGroup}
              assignee={subTask.assignee}
              contactPhone={subTask.contactPhone}
            />
          ))}
        </Space>
      ) : (
        <Text>Заданий нет</Text>
      )}
    </Space>
  )
}

export default SubTaskList
