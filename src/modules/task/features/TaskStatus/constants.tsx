import { BadgeProps } from 'antd'
import React, { ReactElement } from 'react'

import {
  CheckCircleIcon,
  PauseCircleIcon,
  QuestionCircleIcon,
  RightCircleIcon,
} from 'components/Icons'
import { TaskStatusEnum } from 'modules/task/constants/common'

export const badgeNameByTaskStatus: Partial<
  Record<
    TaskStatusEnum,
    Extract<BadgeProps['status'], 'default' | 'warning' | 'success'>
  >
> = {
  [TaskStatusEnum.New]: 'default',
  [TaskStatusEnum.InProgress]: 'warning',
  [TaskStatusEnum.Completed]: 'success',
}

export const iconByTaskStatus: Partial<Record<TaskStatusEnum, ReactElement>> = {
  [TaskStatusEnum.Awaiting]: <PauseCircleIcon />,
  [TaskStatusEnum.InReclassification]: <QuestionCircleIcon />,
  [TaskStatusEnum.Returned]: <RightCircleIcon $color='fireOpal' />,
  [TaskStatusEnum.Closed]: <CheckCircleIcon $color='crayola' />,
}
