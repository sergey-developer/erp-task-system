import { BadgeProps } from 'antd'
import React, { ReactElement } from 'react'

import {
  CheckCircleIcon,
  PauseCircleIcon,
  QuestionCircleIcon,
  RightCircleIcon,
} from 'components/Icons'
import {
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

export const badgeByStatusMap: Partial<
  Record<
    TaskStatusEnum | TaskExtraStatusEnum,
    Extract<BadgeProps['status'], 'default' | 'warning' | 'success'>
  >
> = {
  [TaskExtraStatusEnum.Assigned]: 'default',
  [TaskExtraStatusEnum.NotAssigned]: 'default',
  [TaskStatusEnum.InProgress]: 'warning',
  [TaskStatusEnum.Completed]: 'success',
}

export const iconByStatusMap: Partial<Record<TaskStatusEnum, ReactElement>> = {
  [TaskStatusEnum.Awaiting]: <PauseCircleIcon />,
  [TaskStatusEnum.InReclassification]: <QuestionCircleIcon />,
  [TaskStatusEnum.Returned]: <RightCircleIcon $color='fireOpal' />,
  [TaskStatusEnum.Closed]: <CheckCircleIcon $color='crayola' />,
}
