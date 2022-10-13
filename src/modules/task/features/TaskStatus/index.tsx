import { Space } from 'antd'
import React, { FC } from 'react'

import { TaskStatusEnum } from 'modules/task/constants/common'

import { badgeNameByTaskStatus, iconByTaskStatus } from './constants'
import { BadgeStyled } from './styles'

type TaskStatusProps = {
  status: TaskStatusEnum
  text?: string
}

const TaskStatus: FC<TaskStatusProps> = ({ text, status }) => {
  const badgeName = badgeNameByTaskStatus[status]
  const icon = iconByTaskStatus[status]

  if (!text && !badgeName && !icon) return null

  return (
    <Space>
      {icon ? (
        icon
      ) : badgeName ? (
        <BadgeStyled
          data-testid={`badge-status-${badgeName}`}
          status={badgeName}
        />
      ) : null}

      {text}
    </Space>
  )
}

export default TaskStatus
