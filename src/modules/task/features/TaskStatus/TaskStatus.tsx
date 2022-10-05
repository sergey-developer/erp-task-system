import { Space } from 'antd'
import React, { FC } from 'react'

import { TaskStatusEnum } from 'modules/task/constants/common'

import { badgeByTaskStatus, iconByTaskStatus } from './constants'
import { BadgeStyled } from './styles'

type TaskStatusProps = {
  status: TaskStatusEnum
  text?: string
}

const TaskStatus: FC<TaskStatusProps> = ({ text, status }) => {
  const badge = badgeByTaskStatus[status]
  const icon = iconByTaskStatus[status]

  if (!text && !badge && !icon) return null

  return (
    <Space data-testid='task-status'>
      {icon ? icon : badge ? <BadgeStyled status={badge} /> : null}

      {text}
    </Space>
  )
}

export default TaskStatus
