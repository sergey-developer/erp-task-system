import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TaskCardTabsEnum, taskCardTabNamesDict } from '../constants'

const getContainer = () => screen.getByTestId('task-card-tabs')

const getTabsNav = () => within(getContainer()).getByRole('tablist')

const getNavItem = (tab: TaskCardTabsEnum) =>
  within(getTabsNav()).getByRole('tab', { name: taskCardTabNamesDict[tab] })

const getOpenedTab = (tab: TaskCardTabsEnum) =>
  within(getContainer()).getByRole('tabpanel', {
    name: taskCardTabNamesDict[tab],
  })

const userClickTab = async (user: UserEvent, tab: TaskCardTabsEnum) => {
  await user.click(getNavItem(tab))
}

const utils = {
  getContainer,

  getNavItem,

  getOpenedTab,

  userClickTab,
}

export default utils
