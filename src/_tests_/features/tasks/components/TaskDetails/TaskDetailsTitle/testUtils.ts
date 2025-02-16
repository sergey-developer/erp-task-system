import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, iconTestUtils, menuTestUtils } from '_tests_/helpers'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TaskDetailsTitle)
const queryContainer = () => screen.queryByTestId(TestIdsEnum.TaskDetailsTitle)
const getChildByText = (text: string) => within(getContainer()).getByText(text)

// menu
const getMenuButton = () => buttonTestUtils.getMenuButtonIn(getContainer())
const getMenuItemIcon = (item: HTMLElement, iconName: string) =>
  iconTestUtils.getIconByNameIn(item, iconName)

const openMenu = async (user: UserEvent) => menuTestUtils.openMenu(user, getMenuButton())

// reload button
const getReloadButton = () => buttonTestUtils.getButtonIn(getContainer(), 'sync')
const clickReloadButton = async (user: UserEvent) => {
  const button = getReloadButton()
  await user.click(button)
  return button
}

// execute task
const getExecuteTaskMenuItem = () => menuTestUtils.getMenuItem(/выполнить заявку/i)
const clickExecuteTaskMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/выполнить заявку/i, user)

// register FN
const getRegisterFNMenuItem = () => menuTestUtils.getMenuItem(/Зарегистрировать ФН/i)
const clickRegisterFNMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/Зарегистрировать ФН/i, user)

// request reclassification
const getRequestReclassificationItem = () =>
  menuTestUtils.getMenuItem(/запросить переклассификацию/i)
const queryRequestReclassificationItem = () =>
  menuTestUtils.queryMenuItem(/запросить переклассификацию/i)
const clickRequestReclassificationItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/запросить переклассификацию/i, user)

// cancel reclassification
const getCancelReclassificationItem = () => menuTestUtils.getMenuItem(/отменить переклассификацию/i)
const queryCancelReclassificationItem = () =>
  menuTestUtils.queryMenuItem(/отменить переклассификацию/i)
const clickCancelReclassificationItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/отменить переклассификацию/i, user)

// request suspend
const getRequestSuspendItem = () => menuTestUtils.getMenuItem(/запросить перевод в ожидание/i)
const clickRequestSuspendItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/запросить перевод в ожидание/i, user)

export const taskDetailsTitleTestUtils = {
  getContainer,
  queryContainer,
  getChildByText,

  getMenuButton,
  getMenuItemIcon,
  openMenu,

  getExecuteTaskMenuItem,
  clickExecuteTaskMenuItem,

  getRegisterFNMenuItem,
  clickRegisterFNMenuItem,

  getRequestReclassificationItem,
  queryRequestReclassificationItem,
  clickRequestReclassificationItem,

  getCancelReclassificationItem,
  queryCancelReclassificationItem,
  clickCancelReclassificationItem,

  getRequestSuspendItem,
  clickRequestSuspendItem,

  getReloadButton,
  clickReloadButton,
}
