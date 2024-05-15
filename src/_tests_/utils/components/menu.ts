import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

const getMenu = () => screen.getByRole('menu')
const findMenu = () => screen.findByRole('menu')
const openMenu = async (user: UserEvent, button: HTMLElement) => {
  await user.hover(button)
  return findMenu()
}
const getMenuItem = (name: string | RegExp) => within(getMenu()).getByRole('menuitem', { name })
const queryMenuItem = (name: string | RegExp) => within(getMenu()).queryByRole('menuitem', { name })
const getMenuItems = () => within(getMenu()).getAllByRole('menuitem')

const clickMenuItem = async (name: string | RegExp, user: UserEvent) => {
  const item = getMenuItem(name)
  await user.click(item)
}

const disabledClass = 'ant-dropdown-menu-item-disabled'
const expectMenuItemDisabled = (item: HTMLElement) => expect(item).toHaveClass(disabledClass)
const expectMenuItemNotDisabled = (item: HTMLElement) => expect(item).not.toHaveClass(disabledClass)

const testUtils = {
  getMenu,
  findMenu,
  openMenu,
  getMenuItem,
  queryMenuItem,
  getMenuItems,
  clickMenuItem,
  expectMenuItemDisabled,
  expectMenuItemNotDisabled,
}

export default testUtils
