import { Typography } from 'antd'
import React, { FC } from 'react'

import UserAvatar from 'components/Avatars/UserAvatar'
import Space from 'components/Space'
import { taskStatusDict } from 'modules/task/constants/dictionary'
import {
  badgeByTaskStatus,
  iconByTaskStatus,
} from 'modules/task/features/TaskStatus/constants'
import TaskStatus from 'modules/task/features/TaskStatus/index'
import { TaskModel } from 'modules/task/models'
import { UserModel } from 'modules/user/models'
import { getUserAbbr } from 'modules/user/utils'
import { MaybeNull } from 'shared/interfaces/utils'

const { Text } = Typography

type TaskAssigneeProps = {
  name: string
  phone?: TaskModel['contactPhone']
  status?: TaskModel['status']
  assignee: MaybeNull<Pick<UserModel, 'firstName' | 'lastName' | 'avatar'>>
}

const TaskAssignee: FC<TaskAssigneeProps> = ({
  assignee,
  status,
  name,
  phone,
}) => {
  return (
    <Space data-testid='task-assignee' size='middle' align='start'>
      {assignee && (
        <UserAvatar src={assignee.avatar} abbr={getUserAbbr(assignee)} />
      )}

      <Space direction='vertical'>
        <Text>{name}</Text>

        {phone && <Text>{phone}</Text>}

        {assignee && status && (
          <TaskStatus
            status={status}
            text={taskStatusDict[status]}
            icon={iconByTaskStatus[status]}
            badge={badgeByTaskStatus[status]}
          />
        )}
      </Space>
    </Space>
  )
}

export default TaskAssignee
