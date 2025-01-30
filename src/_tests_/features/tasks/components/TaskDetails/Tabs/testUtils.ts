import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { taskDetailsTabNameDict, TaskDetailsTabsEnum } from 'features/task/constants/task/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskDetailsTabs)
const queryContainer = () => screen.queryByTestId(TestIdsEnum.TaskDetailsTabs)
const getTabsNav = () => within(getContainer()).getByRole('tablist')

const getNavItem = (tab: TaskDetailsTabsEnum) =>
  within(getTabsNav()).getByRole('tab', { name: taskDetailsTabNameDict[tab] })

const queryNavItem = (tab: TaskDetailsTabsEnum) =>
  within(getTabsNav()).queryByRole('tab', { name: taskDetailsTabNameDict[tab] })

const getOpenedTab = (tab: TaskDetailsTabsEnum) =>
  within(getContainer()).getByRole('tabpanel', { name: taskDetailsTabNameDict[tab] })

const clickTab = async (user: UserEvent, tab: TaskDetailsTabsEnum) => {
  await user.click(getNavItem(tab))
}

export const tabsTestUtils = {
  getContainer,
  queryContainer,

  getNavItem,
  queryNavItem,

  getOpenedTab,

  clickTab,
}
