import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  executeInventorizationPageTabNames,
  ExecuteInventorizationPageTabsEnum,
} from 'modules/warehouse/pages/ExecuteInventorizationPage/constants'

import { buttonTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ExecuteInventorizationPage)
const findContainer = () => screen.findByTestId(TestIdsEnum.ExecuteInventorizationPage)

// tabs
const getTabsNav = () => within(getContainer()).getByRole('tablist')

const getNavItem = (tab: ExecuteInventorizationPageTabsEnum) =>
  within(getTabsNav()).getByRole('tab', { name: executeInventorizationPageTabNames[tab] })

const getOpenedTab = (tab: ExecuteInventorizationPageTabsEnum) =>
  within(getContainer()).getByRole('tabpanel', { name: executeInventorizationPageTabNames[tab] })

const clickTab = async (user: UserEvent, tab: ExecuteInventorizationPageTabsEnum) => {
  await user.click(getNavItem(tab))
}

// return to inventorization details
const getReturnToInventorizationDetailsButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Вернуться в карточку')

const clickReturnToInventorizationDetailsButton = async (user: UserEvent) => {
  const button = getReturnToInventorizationDetailsButton()
  await user.click(button)
}

// complete inventorization
const getCompleteInventorizationButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Завершить инвентаризацию')

const clickCompleteInventorizationButton = async (user: UserEvent) =>
  user.click(getCompleteInventorizationButton())

// make report button
const getMakeReportButton = () => buttonTestUtils.getButtonIn(getContainer(), /Сформировать отчет/)

const clickMakeReportButton = async (user: UserEvent) => {
  const button = getMakeReportButton()
  await user.click(button)
}

const expectMakeReportLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getMakeReportButton())

export const executeInventorizationPageTestUtils = {
  getContainer,
  findContainer,

  getOpenedTab,
  clickTab,

  getReturnToInventorizationDetailsButton,
  clickReturnToInventorizationDetailsButton,

  getCompleteInventorizationButton,
  clickCompleteInventorizationButton,

  getMakeReportButton,
  clickMakeReportButton,
  expectMakeReportLoadingFinished,
}
