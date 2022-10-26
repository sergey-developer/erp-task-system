import { BadgeProps, Space } from 'antd'
import React, { FC, ReactElement } from 'react'

import { BadgeStyled } from './styles'

type TaskStatusProps = {
  text?: string
  icon?: ReactElement
  badge?: Extract<BadgeProps['status'], 'default' | 'warning' | 'success'>
}

const TaskStatus: FC<TaskStatusProps> = ({ text, badge, icon }) => {
  if (!text && !badge && !icon) return null

  return (
    <Space data-testid='task-status'>
      {icon ? (
        icon
      ) : badge ? (
        <BadgeStyled data-testid={`badge-status-${badge}`} status={badge} />
      ) : null}

      {text}
    </Space>
  )
}

export default TaskStatus
