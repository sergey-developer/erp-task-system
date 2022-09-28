import { Space } from 'antd'
import React, { FC } from 'react'

import {
  TaskExtendedStatusEnum,
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

import { FastFilterEnum } from '../TaskList/constants/common'
import { badgeByStatusMap, iconByStatusMap } from './constants'
import { BadgeStyled } from './styles'

type TaskStatusProps = {
  status: TaskStatusEnum | TaskExtraStatusEnum | FastFilterEnum
  extendedStatus?: TaskExtendedStatusEnum

  text?: string
}

const TaskStatus: FC<TaskStatusProps> = ({
  text,
  status: taskStatus,
  extendedStatus,
}) => {
  const badge = badgeByStatusMap[taskStatus as keyof typeof badgeByStatusMap]

  const icon =
    iconByStatusMap[
      extendedStatus || (taskStatus as keyof typeof iconByStatusMap)
    ]

  if (!text && !badge && !icon) return null

  return (
    <Space>
      {icon ? icon : badge ? <BadgeStyled status={badge} /> : null}

      {text}
    </Space>
  )
}

export default TaskStatus
