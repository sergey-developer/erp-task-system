import {
  PauseCircleTwoTone,
  QuestionCircleTwoTone,
  RightCircleOutlined,
} from '@ant-design/icons'
import { BadgeProps } from 'antd'
import React, { ReactElement } from 'react'

import { TaskStatusEnum } from 'modules/task/constants/enums'
import theme from 'styles/theme'

export const iconOrBadgeStatusMap: Record<
  TaskStatusEnum,
  ReactElement | BadgeProps['status']
> = {
  [TaskStatusEnum.New]: 'default',
  [TaskStatusEnum.InProgress]: 'warning',
  [TaskStatusEnum.Completed]: 'success',
  [TaskStatusEnum.Appointed]: 'default',

  [TaskStatusEnum.Awaiting]: <PauseCircleTwoTone />,
  [TaskStatusEnum.InReclassification]: <QuestionCircleTwoTone />,
  [TaskStatusEnum.Returned]: (
    <RightCircleOutlined style={{ color: theme.colors.red1 }} />
  ),
}
