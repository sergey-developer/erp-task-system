import { BadgeProps } from 'antd'
import React, { ReactElement } from 'react'

import {
  CheckCircleIcon,
  PauseCircleIcon,
  QuestionCircleIcon,
  RightCircleIcon,
} from 'components/Icons'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

export const badgeByTaskStatus: Readonly<
  Partial<
    Record<
      TaskStatusEnum,
      Extract<BadgeProps['status'], 'default' | 'warning' | 'success'>
    >
  >
> = {
  [TaskStatusEnum.New]: 'default',
  [TaskStatusEnum.InProgress]: 'warning',
  [TaskStatusEnum.Completed]: 'success',
}

export const badgeByTaskExtendedStatus: Readonly<
  Partial<
    Record<
      TaskExtendedStatusEnum,
      Extract<BadgeProps['status'], 'default' | 'warning' | 'success'>
    >
  >
> = {
  [TaskExtendedStatusEnum.New]: 'default',
  [TaskExtendedStatusEnum.InProgress]: 'warning',
  [TaskExtendedStatusEnum.Completed]: 'success',
}

export const iconByTaskExtendedStatus: Readonly<
  Partial<Record<TaskExtendedStatusEnum, ReactElement>>
> = {
  [TaskExtendedStatusEnum.Awaiting]: <PauseCircleIcon />,
  [TaskExtendedStatusEnum.InReclassification]: <QuestionCircleIcon />,
  [TaskExtendedStatusEnum.Returned]: <RightCircleIcon $color='fireOpal' />,
  [TaskExtendedStatusEnum.Closed]: <CheckCircleIcon $color='crayola' />,
}

export const iconByTaskStatus: Readonly<
  Partial<Record<TaskStatusEnum, ReactElement>>
  > = {
  [TaskStatusEnum.Closed]: <CheckCircleIcon $color='crayola' />,
}
