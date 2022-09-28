import { Space } from 'antd'
import React, { FC } from 'react'

import {
  TaskExtendedStatusEnum,
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

import { badgeByStatusMap, iconByStatusMap } from './constants'
import { BadgeStyled } from './styles'

type TaskStatusProps = {
  status: TaskStatusEnum | TaskExtraStatusEnum
  extendedStatus?: TaskExtendedStatusEnum

  text?: string
}

const TaskStatus: FC<TaskStatusProps> = ({
  text,
  status: taskStatus,
  extendedStatus,
}) => {
  const icon = iconByStatusMap[extendedStatus || (taskStatus as TaskStatusEnum)]
  const badge = badgeByStatusMap[taskStatus]

  if (!text && !badge && !icon) return null

  return (
    <Space>
      {icon ? icon : badge ? <BadgeStyled status={badge} /> : null}

      {text}
    </Space>
  )
}

export default TaskStatus
