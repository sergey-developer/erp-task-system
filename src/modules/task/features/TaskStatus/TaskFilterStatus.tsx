import { Space } from 'antd'
import React, { FC } from 'react'

import { FastFilterEnum } from '../TaskList/constants/common'
import { iconByFilter } from './constants'

type TaskFilterStatusProps = {
  status: FastFilterEnum.Overdue
  text: string
}

const TaskFilterStatus: FC<TaskFilterStatusProps> = ({ text, status }) => {
  const icon = iconByFilter[status]

  return (
    <Space data-testid='task-status'>
      {icon}

      {text}
    </Space>
  )
}

export default TaskFilterStatus
