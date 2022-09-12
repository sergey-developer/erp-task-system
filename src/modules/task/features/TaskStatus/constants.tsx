import { BadgeProps } from 'antd'
import React, { ReactElement } from 'react'

import {
  PauseCircleIcon,
  QuestionCircleIcon,
  RightCircleIcon,
} from 'components/Icons'
import { TaskStatusEnum } from 'modules/task/constants/enums'

export const badgeByStatusMap: Partial<
  Record<
    TaskStatusEnum,
    Extract<BadgeProps['status'], 'default' | 'warning' | 'success'>
  >
> = {
  [TaskStatusEnum.New]: 'default',
  [TaskStatusEnum.Appointed]: 'default',
  [TaskStatusEnum.InProgress]: 'warning',
  [TaskStatusEnum.Completed]: 'success',
}

export const iconByStatusMap: Partial<Record<TaskStatusEnum, ReactElement>> = {
  [TaskStatusEnum.Awaiting]: <PauseCircleIcon />,
  [TaskStatusEnum.InReclassification]: <QuestionCircleIcon />,
  [TaskStatusEnum.Returned]: <RightCircleIcon $color='fireOpal' />,
}
