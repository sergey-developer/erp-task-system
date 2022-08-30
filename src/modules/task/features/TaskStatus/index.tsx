import { Space } from 'antd'
import React, { FC } from 'react'

import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/enums'

import { badgeByStatusMap, iconByStatusMap } from './constants'
import { BadgeStyled } from './styles'

type TaskStatusProps = {
  status: TaskStatusEnum

  value?: string
  extendedStatus?: TaskExtendedStatusEnum
}

const TaskStatus: FC<TaskStatusProps> = ({
  value,
  status: taskStatus,
  extendedStatus,
}) => {
  const icon = iconByStatusMap[extendedStatus || taskStatus]
  const badge = badgeByStatusMap[taskStatus]

  return value || badge || icon ? (
    <Space>
      {icon ? icon : badge ? <BadgeStyled status={badge} /> : null}

      {value}
    </Space>
  ) : null
}

export default TaskStatus
