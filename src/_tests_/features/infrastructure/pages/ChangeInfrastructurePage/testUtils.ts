import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, iconTestUtils, spinnerTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId('change-infrastructure-page')

// loading
const expectLoadingStarted = spinnerTestUtils.expectLoadingStarted('infrastructure-loading')
const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished('infrastructure-loading')

// executor
const getExecutorBlock = () => within(getContainer()).getByTestId('executor')

// manager
const getManagerBlock = () => within(getContainer()).getByTestId('manager')

const getAssigneeOnMeButton = () =>
  buttonTestUtils.getButtonIn(getManagerBlock(), /Назначить на себя/)

const queryAssigneeOnMeButton = () =>
  buttonTestUtils.queryButtonIn(getManagerBlock(), /Назначить на себя/)

const clickAssigneeOnMeButton = async (user: UserEvent) => user.click(getAssigneeOnMeButton())

const assigneeOnMeLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getAssigneeOnMeButton())

// status
const getStatusBlock = () => within(getContainer()).getByTestId('status')
const openStatusHistoryModal = async (user: UserEvent) =>
  user.click(iconTestUtils.getIconByNameIn(getStatusBlock(), 'search'))

// go back button
const getGoBackButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Вернуться')
const clickGoBackButton = async (user: UserEvent) => user.click(getGoBackButton())

export const changeInfrastructurePageTestUtils = {
  getContainer,

  getExecutorBlock,

  getManagerBlock,
  getAssigneeOnMeButton,
  queryAssigneeOnMeButton,
  clickAssigneeOnMeButton,
  assigneeOnMeLoadingFinished,

  getStatusBlock,
  openStatusHistoryModal,

  getGoBackButton,
  clickGoBackButton,

  expectLoadingStarted,
  expectLoadingFinished,
}
