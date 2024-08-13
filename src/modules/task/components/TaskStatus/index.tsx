import { Space } from 'antd'
import React, { FC, ReactElement } from 'react'

import { MaybeNull } from 'shared/types/utils'

type TaskStatusProps = {
  status?: MaybeNull<string>
  text?: string
  icon?: ReactElement
  badge?: ReactElement
}

const TaskStatus: FC<TaskStatusProps> = ({ text, badge, icon, status }) => {
  if ((!text && !badge && !icon) || !status) return null

  return (
    <Space data-testid={`task-status-${status}`}>
      {icon ? icon : badge ? badge : null}

      {text}
    </Space>
  )
}

export default TaskStatus
