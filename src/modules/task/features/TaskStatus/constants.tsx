import { PauseCircleTwoTone, RightCircleOutlined } from '@ant-design/icons'
import { BadgeProps } from 'antd'
import React, { ReactElement } from 'react'

import { QuestionCircleIcon } from 'components/Icons'
import { TaskStatusEnum } from 'modules/task/constants/enums'
import theme from 'styles/theme'

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
  [TaskStatusEnum.Awaiting]: <PauseCircleTwoTone />,
  [TaskStatusEnum.InReclassification]: <QuestionCircleIcon />,
  [TaskStatusEnum.Returned]: (
    <RightCircleOutlined style={{ color: theme.colors.fireOpal }} />
  ),
}
