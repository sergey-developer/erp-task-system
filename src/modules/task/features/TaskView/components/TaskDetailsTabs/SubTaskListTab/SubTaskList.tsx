import { Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { SubTaskModel } from 'modules/task/features/TaskView/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import SubTask from './SubTask'

const { Text } = Typography

type SubTaskListProps = {
  data: Array<SubTaskModel>
  isError: boolean
  onClickCancel: (id: SubTaskModel['id']) => void
  onClickRework: (id: SubTaskModel['id']) => void
}

const SubTaskList: FC<SubTaskListProps> = ({
  data,
  isError,
  onClickCancel,
  onClickRework,
}) => {
  return (
    <Space $block direction='vertical'>
      {data.length ? (
        <Space $block direction='vertical' size='large'>
          {data.map((subTask) => (
            <SubTask
              key={subTask.id}
              id={subTask.id}
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
              techResolution={subTask.techResolution}
              onClickCancel={onClickCancel}
              onClickRework={onClickRework}
            />
          ))}
        </Space>
      ) : (
        <Text>{isError ? 'Не удалось получить задания' : 'Заданий нет'}</Text>
      )}
    </Space>
  )
}

export default SubTaskList
