import { BadgeProps } from 'antd'

import { getIconByNameIn } from '_tests_/utils'
import { screen } from '@testing-library/react'

const getTaskStatus = (status: string) =>
  screen.getByTestId(`task-status-${status}`)

const queryTaskStatus = (status: string) =>
  screen.queryByTestId(`task-status-${status}`)

const getTaskStatusIcon = (status: string, name: string) =>
  getIconByNameIn(getTaskStatus(status), name)

const queryTaskStatusBadge = (
  status: string,
  badgeStatus: BadgeProps['status'],
) =>
  // eslint-disable-next-line testing-library/no-node-access
  getTaskStatus(status).querySelector(`.ant-badge-status-${badgeStatus}`)

const testUtils = {
  getTaskStatus,
  queryTaskStatus,
  getTaskStatusIcon,
  queryTaskStatusBadge,
}

export default testUtils
