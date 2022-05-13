import {
  ExclamationCircleOutlined,
  PauseCircleTwoTone,
  QuestionCircleTwoTone,
  RightCircleOutlined,
} from '@ant-design/icons'
import { BadgeProps } from 'antd'
import React, { ReactElement } from 'react'

import { TaskStatusEnum } from 'modules/tasks/taskList/components/TaskListPage/constants'
import theme from 'styles/theme'

export const iconOrBadgeStatusMap: Record<
  TaskStatusEnum,
  ReactElement | BadgeProps['status']
> = {
  [TaskStatusEnum.Appointed]: <QuestionCircleTwoTone />,

  [TaskStatusEnum.Reclassified]: (
    <RightCircleOutlined style={{ color: theme.colors.red1 }} />
  ),
  [TaskStatusEnum.Closed]: (
    <ExclamationCircleOutlined style={{ color: theme.colors.red1 }} />
  ),
  // TODO: Код выше будет изменён

  [TaskStatusEnum.Suspended]: <PauseCircleTwoTone />,

  [TaskStatusEnum.Completed]: 'success',
  [TaskStatusEnum.InProgress]: 'warning',
  [TaskStatusEnum.New]: 'default',
}
