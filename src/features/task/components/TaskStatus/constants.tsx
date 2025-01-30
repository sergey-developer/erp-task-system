import React, { ReactElement } from 'react'

import { TaskExtendedStatusEnum, TaskStatusEnum } from 'features/task/constants/task'

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PauseCircleIcon,
  QuestionCircleIcon,
  RightCircleIcon,
} from 'components/Icons'

import { BadgeStyled } from './styles'

export const badgeByTaskStatus: Readonly<Partial<Record<TaskStatusEnum, ReactElement>>> = {
  [TaskStatusEnum.New]: <BadgeStyled status='default' />,
  [TaskStatusEnum.InProgress]: <BadgeStyled status='warning' />,
  [TaskStatusEnum.Completed]: <BadgeStyled status='success' />,
}

export const iconByTaskStatus: Readonly<Partial<Record<TaskStatusEnum, ReactElement>>> = {
  [TaskStatusEnum.Awaiting]: <PauseCircleIcon />,
  [TaskStatusEnum.Closed]: <CheckCircleIcon $color='crayola' />,
}

export const badgeByTaskExtendedStatus: Readonly<
  Partial<Record<TaskExtendedStatusEnum, ReactElement>>
> = {
  [TaskExtendedStatusEnum.New]: <BadgeStyled status='default' />,
  [TaskExtendedStatusEnum.InProgress]: <BadgeStyled status='warning' />,
  [TaskExtendedStatusEnum.Completed]: <BadgeStyled status='success' />,
}

export const iconByTaskExtendedStatus: Readonly<
  Partial<Record<TaskExtendedStatusEnum, ReactElement>>
> = {
  [TaskExtendedStatusEnum.Awaiting]: <PauseCircleIcon />,
  [TaskExtendedStatusEnum.InReclassification]: <QuestionCircleIcon />,
  [TaskExtendedStatusEnum.Returned]: <RightCircleIcon $color='fireOpal' />,
  [TaskExtendedStatusEnum.Closed]: <CheckCircleIcon $color='crayola' />,
  [TaskExtendedStatusEnum.FirstLineReturned]: <ExclamationCircleIcon $color='fireOpal' />,
}
