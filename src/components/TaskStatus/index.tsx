import { Badge } from 'antd'
import React, { FC } from 'react'

import { TaskStatusEnum } from 'modules/task/constants/enums'

import { iconOrBadgeStatusMap } from './constants'
import { BadgeWrapperStyled } from './styles'

type TaskStatusProps = {
  status: TaskStatusEnum
  value?: string
}

const TaskStatus: FC<TaskStatusProps> = ({ value, status: taskStatus }) => {
  const status = iconOrBadgeStatusMap[taskStatus]
  const isBadge = typeof status === 'string'

  return (
    <BadgeWrapperStyled isBadge={isBadge}>
      {typeof status === 'string' ? <Badge status={status} /> : status}

      {value && <div>{value}</div>}
    </BadgeWrapperStyled>
  )
}

export default TaskStatus
