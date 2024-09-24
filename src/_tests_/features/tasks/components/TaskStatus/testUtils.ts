import { screen, within } from '@testing-library/react'
import { BadgeProps } from 'antd'

import { iconTestUtils } from '_tests_/utils/index'

const getContainer = (status: string) => screen.getByTestId(`task-status-${status}`)

const getContainerIn = (container: HTMLElement, status: string) =>
  within(container).getByTestId(`task-status-${status}`)

const queryContainer = (status: string) => screen.queryByTestId(`task-status-${status}`)

const getIcon = (status: string, name: string) =>
  iconTestUtils.getIconByNameIn(getContainer(status), name)

const queryBadge = (status: string, badgeStatus: BadgeProps['status']) =>
  // eslint-disable-next-line testing-library/no-node-access
  getContainer(status).querySelector(`.ant-badge-status-${badgeStatus}`)

export const taskStatusTestUtils = {
  getContainer,
  getContainerIn,
  queryContainer,
  getIcon,
  queryBadge,
}
