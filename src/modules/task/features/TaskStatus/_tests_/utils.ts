import { BadgeProps } from 'antd'

import { getIconByNameIn } from '_tests_/utils'
import { screen } from '@testing-library/react'

export const getTaskStatus = (status: string) =>
  screen.getByTestId(`task-status-${status}`)

export const queryTaskStatus = (status: string) =>
  screen.queryByTestId(`task-status-${status}`)

export const getTaskStatusIcon = (status: string, name: string) =>
  getIconByNameIn(getTaskStatus(status), name)

export const queryTaskStatusBadge = (
  status: string,
  badgeStatus: BadgeProps['status'],
) =>
  // eslint-disable-next-line testing-library/no-node-access
  getTaskStatus(status).querySelector(`.ant-badge-status-${badgeStatus}`)
