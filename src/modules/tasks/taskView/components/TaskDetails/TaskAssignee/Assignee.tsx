import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import UserAvatar from 'components/Avatars/UserAvatar'
import TaskStatus from 'components/TaskStatus'
import { taskStatusDictionary } from 'modules/tasks/constants'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'

const { Text } = Typography

type TaskAssigneeProps = Partial<
  Pick<TaskDetailsModel, 'assignee' | 'status'>
> & {
  name: string
}

const Assignee: FC<TaskAssigneeProps> = ({ assignee, status, name }) => {
  return (
    <Space size='middle' align='start'>
      {assignee && <UserAvatar user={assignee} />}

      <Space direction='vertical'>
        <Text className='break-text'>{name}</Text>

        {assignee && status && (
          <TaskStatus status={status} value={taskStatusDictionary[status]} />
        )}
      </Space>
    </Space>
  )
}

export default Assignee
