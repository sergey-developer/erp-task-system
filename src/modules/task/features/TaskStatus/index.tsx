import { Badge, BadgeProps } from 'antd'
import _isString from 'lodash/isString'
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
  const isBadge = _isString(status)

  return value || status ? (
    <BadgeWrapperStyled isBadge={isBadge}>
      {isBadge ? <Badge status={status as BadgeProps['status']} /> : status}

      {value && <div>{value}</div>}
    </BadgeWrapperStyled>
  ) : null
}

export default TaskStatus
