import { Space } from 'antd'
import React, { FC } from 'react'

import { TaskExtraStatusEnum } from 'modules/task/constants/common'

import { badgeByTaskExtraStatus } from './constants'
import { BadgeStyled } from './styles'

type TaskExtraStatusProps = {
  status: TaskExtraStatusEnum
  text: string
}

const TaskExtraStatus: FC<TaskExtraStatusProps> = ({ text, status }) => {
  const badge = badgeByTaskExtraStatus[status]

  return (
    <Space data-testid='task-status'>
      <BadgeStyled status={badge} />

      {text}
    </Space>
  )
}

export default TaskExtraStatus
