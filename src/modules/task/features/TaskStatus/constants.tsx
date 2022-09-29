import { BadgeProps } from 'antd'
import React, { ReactElement } from 'react'

import {
  CheckCircleIcon,
  HistoryIcon,
  PauseCircleIcon,
  QuestionCircleIcon,
  RightCircleIcon,
} from 'components/Icons'
import {
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

import { FastFilterEnum } from '../TaskList/constants/common'

export const badgeByStatusMap: Partial<
  Record<
    TaskStatusEnum | TaskExtraStatusEnum,
    Extract<BadgeProps['status'], 'default' | 'warning' | 'success'>
  >
> = {
  [TaskExtraStatusEnum.Assigned]: 'default',
  [TaskExtraStatusEnum.NotAssigned]: 'default',
  [TaskStatusEnum.New]: 'default',
  [TaskStatusEnum.Appointed]: 'default',
  [TaskStatusEnum.InProgress]: 'warning',
  [TaskStatusEnum.Completed]: 'success',
}

export const iconByStatusMap: Partial<
  Record<
    TaskStatusEnum | Extract<FastFilterEnum, FastFilterEnum.Overdue>,
    ReactElement
  >
> = {
  [TaskStatusEnum.Awaiting]: <PauseCircleIcon />,
  [TaskStatusEnum.InReclassification]: <QuestionCircleIcon />,
  [TaskStatusEnum.Returned]: <RightCircleIcon $color='fireOpal' />,
  [TaskStatusEnum.Closed]: <CheckCircleIcon $color='crayola' />,
  [FastFilterEnum.Overdue]: <HistoryIcon $color='fireOpal' />,
}
