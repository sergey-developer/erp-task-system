import { Typography } from 'antd'
import React, { FC } from 'react'

import UserAvatar from 'components/Avatars/UserAvatar'
import Space from 'components/Space'
import {
  taskExtendedStatusDict,
  taskStatusDict,
} from 'modules/task/constants/dictionary'
import {
  badgeByTaskStatus,
  iconByTaskExtendedStatus,
  iconByTaskStatus,
} from 'modules/task/features/TaskStatus/constants'
import TaskStatus from 'modules/task/features/TaskStatus/index'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import useTaskExtendedStatus from 'modules/task/hooks/useTaskExtendedStatus'

const { Text } = Typography

type AssigneeProps = Pick<
  TaskDetailsModel,
  'assignee' | 'status' | 'extendedStatus'
> & {
  name: string
}

const Assignee: FC<AssigneeProps> = ({
  assignee,
  status,
  extendedStatus,
  name,
}) => {
  const taskExtendedStatus = useTaskExtendedStatus(extendedStatus)

  return (
    <Space size='middle' align='start'>
      {assignee && <UserAvatar user={assignee} />}

      <Space direction='vertical'>
        <Text>{name}</Text>

        {assignee && (
          <TaskStatus
            status={taskExtendedStatus.isAwaiting ? extendedStatus : status}
            text={
              taskExtendedStatus.isAwaiting
                ? taskExtendedStatusDict[extendedStatus]
                : taskStatusDict[status]
            }
            icon={
              taskExtendedStatus.isAwaiting
                ? iconByTaskExtendedStatus[extendedStatus]
                : iconByTaskStatus[status]
            }
            badge={badgeByTaskStatus[status]}
          />
        )}
      </Space>
    </Space>
  )
}

export default Assignee
