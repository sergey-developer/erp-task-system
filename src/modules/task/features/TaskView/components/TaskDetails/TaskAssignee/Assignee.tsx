import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import UserAvatar from 'components/Avatars/UserAvatar'
import { taskStatusDict } from 'modules/task/constants/dict'
import TaskStatus from 'modules/task/features/TaskStatus'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

const { Text } = Typography

type AssigneeProps = Partial<Pick<TaskDetailsModel, 'assignee' | 'status'>> & {
  name: string
}

const Assignee: FC<AssigneeProps> = ({ assignee, status, name }) => {
  return (
    <Space size='middle' align='start'>
      {assignee && <UserAvatar user={assignee} />}

      <Space direction='vertical'>
        <Text className='break-text'>{name}</Text>

        {assignee && status && (
          <TaskStatus status={status} value={taskStatusDict[status]} />
        )}
      </Space>
    </Space>
  )
}

export default Assignee
