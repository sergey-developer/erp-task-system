import { Space } from 'antd'
import React, { FC } from 'react'

import { TaskExtraStatusEnum } from 'modules/task/constants/common'

import { badgeNameByTaskExtraStatus } from './constants'
import { BadgeStyled } from './styles'

type TaskExtraStatusProps = {
  status: TaskExtraStatusEnum
  text: string
}

const TaskExtraStatus: FC<TaskExtraStatusProps> = ({ text, status }) => {
  const badgeName = badgeNameByTaskExtraStatus[status]

  return (
    <Space>
      <BadgeStyled
        data-testid={`badge-status-${badgeName}`}
        status={badgeName}
      />

      {text}
    </Space>
  )
}

export default TaskExtraStatus
