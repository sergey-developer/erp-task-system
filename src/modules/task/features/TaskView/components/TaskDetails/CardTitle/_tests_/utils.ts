import { getButtonIn, getIconByNameIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('task-details-card-title')
const getChildByText = (text: string) => within(getContainer()).getByText(text)

// menu
const getMenuButton = () => getButtonIn(getContainer(), 'menu')

const getMenu = () => screen.getByRole('menu')
const getMenuItems = () => within(getMenu()).getAllByRole('menuitem')
const getFirstMenuItem = () => getMenuItems()[0]
const getSecondMenuItem = () => getMenuItems()[1]

const getMenuItemIcon = (item: HTMLElement, iconName: string) =>
  getIconByNameIn(item, iconName)

const getMenuItemText = (item: HTMLElement, text: string) =>
  within(item).getByText(text)

const queryMenuItemText = (item: HTMLElement, text: string) =>
  within(item).queryByText(text)

const userOpenMenu = async (user: UserEvent) => {
  const button = getMenuButton()
  await user.hover(button)
  const menu = getMenu()
  return { button, menu }
}

// close button
const getCloseButton = () => getButtonIn(getContainer(), 'close')

const userClickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

const utils = {
  getContainer,
  getChildByText,

  getMenuButton,
  getMenuItems,
  getFirstMenuItem,
  getSecondMenuItem,
  getMenuItemIcon,
  getMenuItemText,
  queryMenuItemText,
  userOpenMenu,

  getCloseButton,
  userClickCloseButton,
}

export default utils
