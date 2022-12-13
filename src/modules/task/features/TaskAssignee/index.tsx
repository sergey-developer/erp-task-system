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
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import getUserAbbr from 'modules/user/utils/getUserAbbr'

const { Text } = Typography

type TaskAssigneeProps = {
  name: string
  phone?: TaskDetailsModel['contactPhone']
  status?: TaskDetailsModel['status']
  assignee?: TaskDetailsModel['assignee']
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
