import {
  ExclamationCircleOutlined,
  PauseCircleTwoTone,
  QuestionCircleTwoTone,
  RightCircleOutlined,
} from '@ant-design/icons'
import { BadgeProps } from 'antd'
import React, { ReactElement } from 'react'

import { TaskStatusEnum } from 'modules/tasks/constants'
import theme from 'styles/theme'

export const iconOrBadgeStatusMap: Record<
  TaskStatusEnum,
  ReactElement | BadgeProps['status']
> = {
  [TaskStatusEnum.New]: 'default', //true
  [TaskStatusEnum.InProgress]: 'warning', // true

  // ? хз правильно ли
  [TaskStatusEnum.Reclassified]: (
    <RightCircleOutlined style={{ color: theme.colors.red1 }} />
  ),
  [TaskStatusEnum.Closed]: (
    <ExclamationCircleOutlined style={{ color: theme.colors.red1 }} />
  ),

  [TaskStatusEnum.Completed]: 'success', // true
  [TaskStatusEnum.Appointed]: 'default', // true
  [TaskStatusEnum.Awaiting]: <PauseCircleTwoTone />, // true
  [TaskStatusEnum.InReclassification]: <QuestionCircleTwoTone />, // true
}
