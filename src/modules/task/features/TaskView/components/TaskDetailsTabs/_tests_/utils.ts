import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TaskDetailsTabsEnum, taskDetailsTabNamesDict } from '../constants'

const getContainer = () => screen.getByTestId('task-details-tabs')

const getTabsNav = () => within(getContainer()).getByRole('tablist')

const getNavItem = (tab: TaskDetailsTabsEnum) =>
  within(getTabsNav()).getByRole('tab', { name: taskDetailsTabNamesDict[tab] })

const getOpenedTab = (tab: TaskDetailsTabsEnum) =>
  within(getContainer()).getByRole('tabpanel', {
    name: taskDetailsTabNamesDict[tab],
  })

const userClickTab = async (user: UserEvent, tab: TaskDetailsTabsEnum) => {
  await user.click(getNavItem(tab))
}

const utils = {
  getContainer,

  getNavItem,

  getOpenedTab,

  userClickTab,
}

export default utils
