import { Badge } from 'antd'
import React, { FC } from 'react'

import { TaskStatusEnum } from 'modules/task/constants/enums'
import { TaskListReclassificationRequestModel } from 'modules/task/features/TaskList/models'

import { badgeStatusMap, iconStatusMap } from './constants'
import { BadgeWrapperStyled } from './styles'

type TaskStatusProps = {
  status: TaskStatusEnum
  id?: number
  reclassificationRequest?: Pick<
    TaskListReclassificationRequestModel,
    'status' | 'task'
  >
  value?: string
}

const TaskStatus: FC<TaskStatusProps> = ({ value, status: taskStatus }) => {
  const icon = iconStatusMap[taskStatus]
  const badge = badgeStatusMap[taskStatus]
  // console.log({ taskStatus, badge, icon })
  return value || badge || icon ? (
    <BadgeWrapperStyled $isBadge={!!badge}>
      {badge ? <Badge status={badge} /> : icon}

      {value && <div>{value}</div>}
    </BadgeWrapperStyled>
  ) : null
}

export default TaskStatus
