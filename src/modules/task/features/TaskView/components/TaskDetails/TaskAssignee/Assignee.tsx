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

type AssigneeProps = Pick<TaskDetailsModel, 'assignee' | 'contactPhone'> & {
  name: string
  status?: TaskDetailsModel['status']
}

const Assignee: FC<AssigneeProps> = ({
  assignee,
  status,
  name,
  contactPhone,
}) => {
  return (
    <Space size='middle' align='start'>
      {assignee && (
        <UserAvatar src={assignee.avatar} abbr={getUserAbbr(assignee)} />
      )}

      <Space direction='vertical'>
        <Text>{name}</Text>

        {contactPhone && <Text>{contactPhone}</Text>}

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

export default Assignee
