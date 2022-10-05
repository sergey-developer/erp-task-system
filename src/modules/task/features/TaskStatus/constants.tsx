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

export const badgeByTaskStatus: Partial<
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

export const badgeByTaskExtraStatus: Record<
  TaskExtraStatusEnum,
  Extract<BadgeProps['status'], 'default'>
> = {
  [TaskExtraStatusEnum.Assigned]: 'default',
  [TaskExtraStatusEnum.NotAssigned]: 'default',
}

export const iconByTaskStatus: Partial<Record<TaskStatusEnum, ReactElement>> = {
  [TaskStatusEnum.Awaiting]: <PauseCircleIcon />,
  [TaskStatusEnum.InReclassification]: <QuestionCircleIcon />,
  [TaskStatusEnum.Returned]: <RightCircleIcon $color='fireOpal' />,
  [TaskStatusEnum.Closed]: <CheckCircleIcon $color='crayola' />,
}

export const iconByFilter: Record<FastFilterEnum.Overdue, ReactElement> = {
  [FastFilterEnum.Overdue]: <HistoryIcon $color='fireOpal' />,
}
