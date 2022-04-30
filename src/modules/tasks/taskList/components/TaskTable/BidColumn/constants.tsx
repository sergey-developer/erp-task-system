import {
  ExclamationCircleOutlined,
  PauseCircleTwoTone,
  QuestionCircleTwoTone,
  RightCircleOutlined,
} from '@ant-design/icons'
import { BadgeProps } from 'antd'
import React, { ReactElement } from 'react'

import { TaskStatusEnum } from 'modules/tasks/taskList/components/TaskListPage/constants'
import theme from 'styles/theme'

export const iconOrBadgeStatusMap: Record<
  TaskStatusEnum,
  ReactElement | BadgeProps['status']
> = {
  [TaskStatusEnum.New]: <QuestionCircleTwoTone />,
  [TaskStatusEnum.InProgress]: <PauseCircleTwoTone />,

  [TaskStatusEnum.Reclassified]: (
    <RightCircleOutlined style={{ color: theme.colors.red1 }} />
  ),
  [TaskStatusEnum.Closed]: (
    <ExclamationCircleOutlined style={{ color: theme.colors.red1 }} />
  ),

  [TaskStatusEnum.Completed]: 'success',
  [TaskStatusEnum.Appointed]: 'default',
}
