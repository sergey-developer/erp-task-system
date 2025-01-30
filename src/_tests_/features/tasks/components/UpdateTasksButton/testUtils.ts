import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, menuTestUtils } from '_tests_/utils'

const getUpdateTasksButton = (container?: HTMLElement) =>
  container
    ? buttonTestUtils.getButtonIn(container, /Обновить заявки/)
    : screen.getByRole('button', { name: /Обновить заявки/ })

const clickUpdateTasksButton = async (user: UserEvent, container?: HTMLElement) => {
  const button = getUpdateTasksButton(container)
  await user.click(button)
}

const getDownButton = (container?: HTMLElement) =>
  container
    ? buttonTestUtils.getButtonIn(container, 'down')
    : screen.getByRole('button', { name: 'down' })

const openDropdown = async (user: UserEvent, container?: HTMLElement) => {
  const button = getDownButton(container)
  await user.click(button)
}

const getAutoUpdateItem = () => menuTestUtils.getMenuItem('Автообновление')
const clickAutoUpdateItem = async (user: UserEvent) => {
  const item = getAutoUpdateItem()
  await user.click(item)
}

export const updateTasksButtonTestUtils = {
  getUpdateTasksButton,
  clickUpdateTasksButton,

  getDownButton,
  openDropdown,

  getAutoUpdateItem,
  clickAutoUpdateItem,
}
