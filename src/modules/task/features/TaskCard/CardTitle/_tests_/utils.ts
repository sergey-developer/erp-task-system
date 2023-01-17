import { getButtonIn, getIconByNameIn } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getContainer = () => screen.getByTestId('task-card-title')

const queryContainer = () => screen.queryByTestId('task-card-title')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// menu
const getMenuButton = () => getButtonIn(getContainer(), 'menu')
const getMenu = () => screen.getByRole('menu')
const findMenu = () => screen.findByRole('menu')
const getMenuItems = () => within(getMenu()).getAllByRole('menuitem')
const getFirstMenuItem = () => getMenuItems()[1]
const getSecondMenuItem = () => getMenuItems()[2]

const getMenuItemIcon = (item: HTMLElement, iconName: string) =>
  getIconByNameIn(item, iconName)

const getMenuItemText = (item: HTMLElement, text: string) =>
  within(item).getByText(text)

const queryMenuItemText = (item: HTMLElement, text: string) =>
  within(item).queryByText(text)

const userClickFirstMenuItem = async (user: UserEvent) => {
  const item = getFirstMenuItem()
  await user.click(item)
  return item
}

const userClickSecondMenuItem = async (user: UserEvent) => {
  const item = getSecondMenuItem()
  await user.click(item)
  return item
}

const userOpenMenu = async (user: UserEvent) => {
  const button = getMenuButton()
  await user.hover(button)
  const menu = await findMenu()
  return { button, menu }
}

const expectMenuItemDisabled = (item: HTMLElement) =>
  expect(item).toHaveClass('ant-dropdown-menu-item-disabled')

const expectMenuItemNotDisabled = (item: HTMLElement) =>
  expect(item).not.toHaveClass('ant-dropdown-menu-item-disabled')

// close button
const getCloseButton = () => getButtonIn(getContainer(), 'close')

const userClickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

const utils = {
  getContainer,
  queryContainer,
  getChildByText,

  getMenuButton,
  findMenu,
  getMenuItems,
  getFirstMenuItem,
  getSecondMenuItem,
  getMenuItemIcon,
  getMenuItemText,
  queryMenuItemText,
  userOpenMenu,
  userClickFirstMenuItem,
  userClickSecondMenuItem,
  expectMenuItemDisabled,
  expectMenuItemNotDisabled,

  getCloseButton,
  userClickCloseButton,
}

export default utils
